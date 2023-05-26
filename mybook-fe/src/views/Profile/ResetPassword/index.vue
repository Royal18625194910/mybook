<template>
  <a-card title="修改密码">
    <a-form :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
      <a-form-item label="原始密码">
        <a-input type="password" v-model:value="form.oldPassword" />
      </a-form-item>
      <a-form-item label="新密码">
        <a-input type="password" v-model:value="form.newPassword" />
      </a-form-item>
      <a-form-item label="确认新密码">
        <a-input type="password" v-model:value="form.confirmNewPassword" />

        <div style="margin-top: 24px;">
          <a-button @click="resetPassword" type="primary">修改</a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { profile } from '@/service';
import { message } from 'ant-design-vue';
import { result } from '@/utils/result';

export default defineComponent({
  setup() {
    const form = reactive({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });

    const resetPassword = async () => {
      const {
        confirmNewPassword,
        newPassword,
        oldPassword,
      } = form;

      // 判断两次新密码输入
      if (confirmNewPassword !== newPassword) {
        message.error('两次输入密码不同');
        return;
      }

      const res = await profile.resetPassword(
        newPassword,
        oldPassword,
      );

      result(res)
        .success(({ msg }) => {
          message.success(msg);
          // 清空表单
          form.oldPassword = '';
          form.confirmNewPassword = '';
          form.newPassword = '';
        });
    };

    return {
      form,
      resetPassword,
    };
  },
});

</script>