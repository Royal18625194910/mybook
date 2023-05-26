<template>
  <div>
    <a-spin :spinning="loading">
    <a-card
    >
        <div v-if="!simple">
          <h2>操作日志</h2>
          <a-divider />
        </div>
        <h2>{{ simple ? '最近操作记录' : '' }}</h2>
      <div>
        <a-table
          bordered
          :columns="columns"
          :data-source="list"
          :pagination="!simple && pagination"
          @change="setPage"
        >
          <template #bodyCell="{ column,record }">
            <!-- 用户名 -->
            <template v-if="column.dataIndex === 'user.account'">
              {{ record.user.account }}
            </template>
            <!-- 访问地址 -->
            <template v-if="column.dataIndex === 'request.url'">
              {{ getLogInfoByPath(record.request.url) }}
            </template>
            <!-- 记录时间 -->
            <template v-if="column.dataIndex === 'createdAt'">
              {{ formatTimestamp(record.meta.createAt) }}
            </template>
             <!-- 操作 -->
             <template v-if="column.dataIndex === 'actions' && !simple">
              <a href="javascript:;" @click="remove(record._id)">删除</a>
            </template>
          </template>
        </a-table>
      </div>
    </a-card>
    </a-spin>
  </div>
</template>

<script >
import { defineComponent,onMounted,ref,computed } from 'vue'
import { log } from '@/service'
import { result } from '@/utils/result'
import { getLogInfoByPath } from '@/utils/log'
import { formatTimestamp } from '@/utils/formatTimestamp'



export default defineComponent({
  props: {
    simple: Boolean
  },
  setup (props) {
    const columns = [
  {
    title: '用户名',
    dataIndex: 'user.account'
  },
  {
    title: '动作',
    dataIndex: 'request.url'
  },
  {
    title: '记录时间',
    dataIndex: 'createdAt'
  },
  
]

if ( !props.simple ) {
  columns.push({
    title: '操作',
    dataIndex: 'actions'
})
}
    // 当前页码
    const curPage = ref(1)  
    // 每页数量
    const size = ref(10)
    // 日志列表数据
    const list = ref([])
    // 日志列表总数
    const total = ref(0)
    // loading
    const loading = ref(true)

    // 获取日志列表
    const getList = async () => {
      const res = await log.list(curPage.value,size.value)
      loading.value = false
      result(res)
      .success(({data: {list: l,total: t}}) => {
        list.value = l
        total.value = t
      })
    }

    // 分页功能
    const pagination = computed(() => ({
      total: total.value,
      current: curPage.value,
      pageSize: size.value,
    }));

    // 切页
    const setPage = (page) => {
      curPage.value = page.current
      getList()
    }

    // 删除某条日志
    const remove = async id => {
      const res = await log.remove(id)
      console.log(res);
      getList()
    }

    onMounted(()=>{
      getList()
    })
    return {
      curPage,
      size,
      list,
      total,
      columns,
      getList,
      pagination,
      getLogInfoByPath,
      setPage,
      loading,
      formatTimestamp,
      remove,
      simple: props.simple
    }
  }
})
</script>

<style scoped>

</style>