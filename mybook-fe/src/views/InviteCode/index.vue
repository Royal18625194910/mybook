<template>
  <div>
    <a-card title="邀请码管理">
      <div>
        <a-input-number v-model:value="count" :min="1" :max="10000" />
        &nbsp;
        <a-button type="primary" @click="add">添加</a-button>
      </div>
      <a-divider />
      <div>
        <a-table
          :pagination="pagination"
          :columns="columns"
          :data-source="list"
          bordered
          @change="setPage"
        >
        <template #bodyCell="{ record,  column}">
          <!-- 账户 -->
          <template v-if="column.dataIndex === 'code'">
            {{ record.code }}
          </template>
          <!-- 状态 -->
          <template v-if="column.dataIndex === 'status'">
            {{ record.user ? '已使用' : '未使用' }}
          </template>
          <!-- 删除 -->
          <template v-if="column.dataIndex === 'actions'">
            <a-button type="danger" @click="remove(record)">删除</a-button>
          </template>
        </template>
        </a-table>
      </div>
    </a-card>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted,computed } from 'vue';
import { inviteCode } from '@/service';
import { result } from '@/utils/result';
import { message } from 'ant-design-vue';

const columns = [
  {
    title: '邀请码',
    dataIndex: 'code',
  },
  {
    title: '使用状态',
    dataIndex: 'status',
  },
  {
    title: '操作',
    dataIndex: 'actions'
  },
];

export default defineComponent({
  setup() {
    const count = ref(1)
    const list = ref([])
    const current = ref(1)
    const total = ref(0)
    const pageSize = ref(10)

    // 获取申请重置密码的用户列表
    const getList = async () => {
      const res = await inviteCode.list(current.value,pageSize.value)
      result(res)
      .success(({data:{list:l,total:t}}) => {
        total.value = t
        list.value = l
      })
    }

    onMounted(() => {
      getList()
    })
    
    // 分页
    const pagination = computed(() => ({
      total: total.value,
      current: current.value,
      pageSize: pageSize.value,
    }));

    // 切页
    const setPage = ({ current: c}) => {
      current.value = c
      getList()
    }

    // 添加邀请码
    const add = async () => {
      const res = await inviteCode.add(count.value)
      result(res)
      .success(({msg}) => {
        message.success(msg)
        getList()
      })
    }

    // 点击删除
    const remove = async ({_id}) => {
      const res = await inviteCode.remove(_id)
      result(res)
      .success(({msg}) => {
        message.success(msg)
        getList()
      })
    }

    return {
      columns,
      list,
      total,
      pageSize,
      count,
      pagination,
      setPage,
      add,
      remove
    }
  }
})
</script>