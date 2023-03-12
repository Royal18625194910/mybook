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

module.exports = {
  getMeta,
  getBody,
  preSave
}