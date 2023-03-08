import { message } from 'ant-design-vue';


export const result = ( res,authShowErrorMsg = true ) => {
  const { data } = res
  if ( !data.code && authShowErrorMsg ) message.error(data.msg)
  return {
    success(cb) {
      if ( data.code ) {
        cb(data,res)
      }
      return this
    },
    fail(cb) {
      if ( data.code === 0 ) {
        cb(data,res)
      }
      return this
    },
    finnal(cb) {
      cb(data,res)
      return this
    }
  }
}