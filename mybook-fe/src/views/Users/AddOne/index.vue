<template>
  <div>
    <a-modal :visible="props.show" title="添加用户" @ok="submit" @cancel="close">
      <a-form
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
        ref="formRef"
        :model="addForm"
      >
      <!-- 用户 -->
        <a-form-item label="用户" name="account">
          <a-input v-model:value="addForm.account" />
        </a-form-item>
        <!-- 密码 -->
        <a-form-item label="密码" name="password">
          <a-input-password v-model:value="addForm.password" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent,reactive,ref } from 'vue'
import {user} from '@/service'
import { result } from '@/utils/result.js'
import { message } from 'ant-design-vue';
export default defineComponent({
  props: {
    show:Boolean
  },
  setup (props,context) {
    const formRef = ref(null)
    // 表单数据
    const addForm = reactive({
      account: '',// 用户
      password: '',// 密码
    })

    // 点击提交
    const submit = async () => {
      const form = JSON.parse(JSON.stringify(addForm))
      // 将日期改成时间戳
      const res = await user.add(form)
      result(res)
      .success((data) => {
        message.success(data.msg)
        context.emit('getList')
      })
      formRef.value.resetFields()
      close()
    }

    // 点击关闭
    const close = () => { 
      context.emit('update:show',false)
    }
    return {
      formRef,
      addForm,
      submit,
      props,
      close,
    }
  }
})
</script>

<style scoped>

</style>