<template>
  <div>
    <a-card>
      <space-between>
        <h2>{{ bookDetail.name }}</h2>
        <div>
          <a-button size="small" type="primary" @click="show = true">编辑</a-button>
          &nbsp;
          <a-button size="small" type="danger" @click="remove">删除</a-button>
        </div>
      </space-between>
      <a-divider />
      <div class="base-info">
        <div class="items">
          <div class="item">
            <div class="title">价格</div>
            <div class="content">{{ bookDetail.price }}</div>
          </div>
          <div class="item">
            <div class="title">作者</div>
            <div class="content">{{ bookDetail.author }}</div>
          </div>
          <div class="item">
            <div class="title">分类</div>
            <div class="content">{{ bookDetail.classify }}</div>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <div class="title">生产日期</div>
            <div class="content">{{  formatTimestamp(bookDetail.publishDate) }}</div>
          </div>
        </div>
      </div>
    </a-card>
    <div class="log">
      <a-card title="出入库日志">
        <template #extra>
          <span>
            <a href="javascript:;" @click="logFilter(1)">
              <CheckOutlined v-if="curLogType === 1"/>
              入库日志
            </a>
          </span>
          <span style="margin-left: 12px;">
            <a href="javascript:;" @click="logFilter(2)">
              <CheckOutlined v-if="curLogType === 2"/>
              出库日志
            </a>
          </span>
        </template>
        <div>
          <a-table
            bordered
            :data-source="log"
            :pagination="pagination"
            @change="setLogPage"
            :columns="columns"
          >
          <template #bodyCell="{ record,  column}">
            <template v-if="column.dataIndex === 'createAt'">
              {{ formatTimestamp(record.meta.createAt) }}
            </template>
          </template>
          </a-table>
        </div>
      </a-card>
    </div>
    <Update v-model:show="show" :book="bookDetail" @update="update"/>
  </div>
</template>

<script>
import { defineComponent,onMounted,ref,computed } from 'vue';
import Update from '@/views/Books/Update/index.vue'
import { useRouter } from 'vue-router';
import { book,inventoryLog } from '@/service'
import { useRoute } from 'vue-router';
import { result } from '@/utils/result'
import { formatTimestamp } from '@/utils/formatTimestamp'
import { message } from 'ant-design-vue';
import { CheckOutlined } from '@ant-design/icons-vue';
const columns = [
    {
      title: '数量',
      dataIndex: 'num',
    },
    {
      title: '时间',
      dataIndex: 'createAt',
    }
  ]
export default defineComponent({
  components: {
    Update,
    CheckOutlined
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const {id} = route.params
    const bookDetail = ref({})
    const show = ref(false)
    const log = ref([])
    const logTotal = ref(0)  // 日志总数
    const logCurPage = ref(1)  // 日志当前页
    const pageSize = ref(3)
    const curLogType = ref(1)   // 出库入库
    // 获取详情数据
    const getDetail = async () => {
      const res = await book.detail(id)
      result(res)
      .success(({data}) => {
        bookDetail.value = data
      })
    }
    // 删除信息
    const remove = async () => {
      const res = await book.remove(id)
      result(res)
      .success(({msg}) => {
        message.success(msg)
        router.replace('/books')
      })
    }
    // 编辑信息
    const update = (book) => {
      Object.assign(bookDetail.value,book)
    }
    // 获取出入库日志
    const getInventoryLog = async (type) => {
      const res = await inventoryLog.list({id,type,page:logCurPage.value,size:pageSize.value})
      result(res)
      .success( ({data: {list,total}}) => {
        console.log(list);
        log.value = list
        logTotal.value = total
      })
    }
    // 分页对象
    const pagination = computed(() => ({
      total: logTotal.value,
      current: logCurPage.value,
      pageSize:pageSize.value,
    }));
    // 换页
    const setLogPage = (page) => {
      logCurPage.value = page.current
      getInventoryLog()
    }
    // 筛选日志
    const logFilter = (type) => {
      console.log(type);
      curLogType.value = type
      getInventoryLog(type)
    }
    onMounted(() => {
      getDetail()
      getInventoryLog(curLogType.value)
    })
    return {
      getDetail,
      bookDetail,
      formatTimestamp,
      remove,
      update,
      show,
      log,
      logTotal,
      logCurPage,
      pagination,
      setLogPage,
      columns,
      pageSize,
      curLogType,
      logFilter
    }
  }
})
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
