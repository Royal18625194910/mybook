const { verify,getToken} = require('../db/token')
// require('./Schemas/Log')  // LogSchema创建的model



/**
 * 返回Schema的元信息Meta
 * @returns { }
 */
const getMeta = () => ({
  createAt: {
    type: Number,
    default: (new Date()).getTime()
  },
  updateAt: {
    type: Number,
    default: (new Date()).getTime()
  },
})

const preSave = function (next) {
  if ( this.isNew ) {
    const ts = Date.now()
    this['meta'].createAt = ts
    this['meta'].updateAt = ts
  } else {
    this['meta'].updateAt = Date.now()
  }
  next()
}

/**
 * 获取ctx.request.body
 */
const getBody = (ctx) =>  ctx.request.body || {}

const logMiddleware = async (ctx,next) => {
  const mongoose = require('mongoose')
  const Log = mongoose.model('Log')

  const startTime = Date.now()
  await next()

  let payload = {}

  try {
    payload = await verify(getToken(ctx))
  } catch (error) {
    payload = {
      account: '未知用户',
      id: ''
    }
  }

  const url = ctx.url
  const method = ctx.method
  const status = ctx.status
  let show = true
  if ( url === '/log/delete' ) {
    show = false
  }

  let responseBody = ''
  if ( typeof ctx.body === 'string' ) {
    responseBody = ctx.body
  } else {
    try {
      responseBody = JSON.stringify(ctx.body)
    } catch  {
      responseBody = ''
    }
  }

  const endTime = Date.now()

  const log = new Log({
    user: {
      account: payload.account,
      id: payload.id
    },
    request: {
      method,
      url,
      responseBody,
      status,
    },
    show,
    startTime,
    endTime
  })
  

  await log.save()
}

const xlsx = require('node-xlsx');

// 加载excel
const loadExcel = (path) => {
  return xlsx.parse(path);
};

// 获取第一个sheet
const getFirstSheet = (sheets) => {
  return sheets[0].data;
};

module.exports = {
  getMeta,
  getBody,
  preSave,
  logMiddleware,
  loadExcel,
  getFirstSheet
}