<template>
  <div>
    <a-card title="重置密码申请列表">

      <a-table
        bordered
        :columns="columns"
        :data-source="list"
        :pagination="pagination"
        @change="setPage"
      >
        <template #bodyCell="{ record,  column}">
          <!-- 账户 -->
          <template v-if="column.dataIndex === 'account'">
            {{ record.account }}
          </template>
          <template v-if="column.dataIndex === 'actions'">
            <a-button size="small" type="primary" @click="changeStatus(record._id,3)">重置</a-button>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <a-button size="small" @click="changeStatus(record._id,2)">忽略</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { defineComponent,onMounted,ref,computed } from 'vue'
import { resetPassword } from '@/service'
import { result } from '@/utils/result'
import { message } from 'ant-design-vue'

const columns = [
  {
    title: '账户',
    dataIndex: 'account'
  },
  {
    title: '操作',
    dataIndex: 'actions'
  }
]

export default defineComponent({
  setup () {
    const list = ref([])
    const current = ref(1)
    const total = ref(0)
    const pageSize = ref(3)
    
    // 获取申请重置密码的用户列表
    const getList = async () => {
      const res = await resetPassword.list(current.value,pageSize.value)
      result(res)
      .success(({data:{list:l,total:t}}) => {
        total.value = t
        list.value = l
      })
    }

    // 分页
    const pagination = computed(() => ({
      total: total.value,
      current: current.value,
      pageSize: pageSize.value,
    }));

    // 切页
    const setPage = ({current:c}) => {
      current.value = c
      getList()
    }

    // 改变重置密码状态
    // 1 待处理  2 已重置  3 已忽略
    const changeStatus = async (id,status) => {
      const res = await resetPassword.updateStatus(id,status)
      result(res)
      .success(({msg}) => {
        message.success(msg)
        getList()
      })
    }

    onMounted(() => {
        getList()
    })
    
    return {
      list,
      current,
      total,
      pagination,
      getList,
      columns,
      changeStatus,
      setPage
    }
  }
})
</script>

<style scoped>

</style>