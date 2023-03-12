<template>
  <div>
    <!-- <a-card :title="$$.PAGE_META.CLASSIFY.PAGE_TITLE"> -->
    <a-card>
      <div>
        <!-- <a-input
          v-model:value="title"
          :placeholder="$$.PAGE_META.CLASSIFY.ADD_FORM_INPUT_PLACEHOLDER"
          style="width: 200px;"
        /> -->
        <a-input-search
          v-model:value="keyword"
          placeholder="根据书名搜索"
          style="width: 200px;"
          enter-button
          @search="onSearch"
        />
        &nbsp;
        <a-button @click="add" type="primary">添加</a-button>
      </div>

      <a-divider />

      <div>
        <!-- 表格 -->
        <a-table
          bordered
          :pagination="pagination"
          :columns="columns" 
          :dataSource="list"
          @change="setPage"
        >
          <template #bodyCell="{ record,  column}">
            <!-- 出版日期格式化 -->
            <template v-if="column.dataIndex === 'publishDate'">
              {{formatTimestamp(record.publishDate)}}
            </template>
            <!-- 操作 -->
            <template v-if="column.dataIndex === 'actions'">
              <a href="javascript:;" @click="toDetail(record)">详情</a>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <a href="javascript:;" @click="update(record)">编辑</a>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <a href="javascript:;" @click="remove(record)">删除</a>
            </template>
            <!-- 出库入库 -->
            <template v-if="column.dataIndex === 'count'">
              <a href="javascript:;" @click="updateCount(1,record)">入库</a>
              {{ record.count }}
              <a href="javascript:;" @click="updateCount(2,record)">出库</a>
            </template>
          </template>
        </a-table>
      </div>
    </a-card>
    <!-- 添加图书组件 -->
    <AddOne :show="show" v-model:show="show" @getList="getList"/>
    <Update :show="updateShow" v-model:show="updateShow" :book="curEditBook" @update="updateCurBook"/>
  </div>
</template>

<script lang="jsx">
import { defineComponent,ref,onMounted,computed,watch } from 'vue'
import AddOne from './AddOne/index.vue'
import Update from './Update/index.vue'
import {book} from '@/service'
import { result } from '@/utils/result.js'
import { formatTimestamp } from '@/utils/formatTimestamp.js'
import { message,Modal  } from 'ant-design-vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    AddOne,
    Update
  },
  setup () {
    const router = useRouter()
    // 表格列名
    const columns = [
      {
        title: '书名',
        dataIndex: 'name',
      },
      {
        title: '价格',
        dataIndex: 'price',
      },
      {
        title: '作者',
        dataIndex: 'author',
      },
      {
        title: '出版日期',
        dataIndex: 'publishDate',
      },
      {
        title: '分类',
        dataIndex: 'classify',
      },
      {
        title: '库存',
        dataIndex: 'count',
      },
      {
        title: '操作',
        dataIndex: 'actions',
      },
    ];
    // 表格数据
    const list = ref([]);
    const show = ref(false)
    const updateShow = ref(false)
    const title = ref('')
    const total = ref(0)   // 总数据
    const currentPage = ref(1)  // 当前页码
    const size = ref(5)    // 每页条数
    const keyword = ref('')
    const curEditBook = ref({})
    watch(keyword,(newKey) => {
      if( !newKey ) getList()
    })
    // 添加书籍
    const add = () => {
      show.value = true
    } 

    // 获取书籍列表
    const getList = async () => {
      const res = await book.list(
        {
          page:currentPage.value,
          size:size.value,
          keyword: keyword.value
        }
        )
      result(res)
      .success(({data}) => {
        const { total:t,list:l } = data
        list.value = l
        total.value = t
      })
    }

    // 删除某个书籍
    const remove = async ({_id}) => {
      const res = await book.remove(_id);
      result(res)
      .success((data) => {
        message.success(data.msg)
      })
      getList()
    }
    onMounted( async () => {
      getList()
    })
    // 点击换页
    const setPage = (pagination) => {
      currentPage.value = pagination.current
      getList()
    }
    // 实现分页功能
    const pagination = computed(() => ({
      total: total.value,
      current: currentPage.value,
      pageSize: size.value
    }))

    // 点击搜索
    const onSearch = () => {
      getList()
    }

    const updateCount = (type,record) => {
      let word = '增加'
      if ( type === 2 ) {
        word = '减少'
      }
      Modal.confirm({
        title: `要${word}多少库存？`,
        content: (
          <div>
            <input class="__book_input_count" />
          </div>
        ),
        onOk:async () => {
          const el = document.querySelector('.__book_input_count')
          const res = await book.updateCount({id:record._id,num:Number(el.value),type})
          result(res)
          .success(data => {
            message.success(data.msg)
            getList()
          })
        }
      });
    };

    // 编辑
    const update = (record) => {
      record.publishDate = Date.parse(record.publishDate)
      updateShow.value = true
      curEditBook.value = record
    }

    // 书籍详情页
    const toDetail = (record) => {
      router.push(`/books/${record._id}`)
    }

    const updateCurBook = (data) => {
      Object.assign(curEditBook,data)
      getList()
    }

      return {
        title,
        columns,
        list,
        add,
        show,
        updateShow,
        formatTimestamp,
        onMounted,
        pagination,
        setPage,
        keyword,
        onSearch,
        remove,
        updateCount,
        update,
        curEditBook,
        updateCurBook,
        toDetail,
        getList
      }
    }
  })
</script>

<style scoped lang="scss">
@import url(./index.scss);
</style>