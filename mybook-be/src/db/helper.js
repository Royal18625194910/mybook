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

module.exports = {
  getMeta
}