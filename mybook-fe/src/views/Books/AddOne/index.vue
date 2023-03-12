<template>
  <div>
    <a-modal :visible="props.show" title="添加书籍" @ok="submit" @cancel="close">
      <a-form
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
        ref="formRef"
        :model="addForm"
      >
      <!-- 书名 -->
        <a-form-item label="书名" name="name">
          <a-input v-model:value="addForm.name" />
        </a-form-item>
        <!-- 价格 -->
        <a-form-item label="价格" name="price">
          <a-input-number :min="0" :max="9999999" v-model:value="addForm.price" />
        </a-form-item>
        <!-- 作者 -->
        <a-form-item label="作者" name="author">
          <a-input v-model:value="addForm.author" />
        </a-form-item>
        <!-- 出版日期 -->
        <a-form-item label="出版日期" name="publishDate">
          <a-date-picker v-model:value="addForm.publishDate" />
        </a-form-item>
        <!-- 分类 -->
        <a-form-item label="分类" name="classify">
          <a-input v-model:value="addForm.classify" />
        </a-form-item>
        <!-- 库存 -->
        <a-form-item label="库存" name="count">
          <a-input v-model:value="addForm.count" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent,reactive,ref,onMounted } from 'vue'
import {book} from '@/service'
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
      name: '',// 书名
      price: 0,// 价格
      author: '',// 作者
      publishDate: null,// 出版日期
      classify: '',// 分类 
      count: 0, // 库存
    })

    // 点击提交
    const submit = async () => {
      const form = JSON.parse(JSON.stringify(addForm))
      // 将日期改成时间戳
      form.publishDate = addForm.publishDate?.valueOf()
      const res = await book.add(form)
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