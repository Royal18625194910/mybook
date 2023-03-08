<template>
  <div>
    <a-modal :visible="props.show" title="添加书籍" @ok="submit" @cancel="close">
        <a-form
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 12 }"
          ref="formRef"
          :model="editForm"
        >
      <!-- 书名 -->
        <a-form-item label="书名" name="name">
          <a-input v-model:value="editForm.name" />
        </a-form-item>
        <!-- 价格 -->
        <a-form-item label="价格" name="price">
          <a-input-number :min="0" :max="9999999" v-model:value="editForm.price" />
        </a-form-item>
        <!-- 作者 -->
        <a-form-item label="作者" name="author">
          <a-input v-model:value="editForm.author" />
        </a-form-item>
        <!-- 出版日期 -->
        <a-form-item label="出版日期" name="publishDate">
          <a-date-picker v-model:value="editForm.publishDate" />
        </a-form-item>
        <!-- 分类 -->
        <a-form-item label="分类" name="classify">
          <a-input v-model:value="editForm.classify" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent,reactive,ref,watch } from 'vue'
import moment from 'moment'
import { book } from '@/service'
import { result } from '@/utils/result'
import { message } from 'ant-design-vue'
export default defineComponent({
  props: {
    show:Boolean,
    book:Object
  },
  setup (props,context) {
    const formRef = ref(null)
    // 表单数据
    const editForm = reactive({
      name: '',// 书名
      price: 0,// 价格
      author: '',// 作者
      publishDate: 0,// 出版日期
      classify: '',// 分类 
    })

    // 侦听书籍信息变化
    watch(()=>props.book,(current) => {
      Object.assign(editForm,current)
      editForm.publishDate = (Number(editForm.publishDate))
      console.log('editForm',editForm);
    })

    // 点击提交按钮保存编辑好的书籍信息
    const submit = async () => {
      const res = await book.update({
        id: props.book._id,
        ...editForm
      })
      
      result(res)
      .success(({data}) => {
        context.emit('update:book',data)
        console.log(data);
        message.success(data.msg)
      })
    }

    // 点击关闭
    const close = () => { 
      context.emit('update:show',false)
    }
    return {
      formRef,
      editForm,
      props,
      close,
      submit
    }
  }
})
</script>

<style scoped>

</style>