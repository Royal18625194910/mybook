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

/**
 * 获取ctx.request.body
 */
const getBody = (ctx) =>  ctx.request.body || {}

module.exports = {
  getMeta,
  getBody
}