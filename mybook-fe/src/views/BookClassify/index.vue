<template>
  <div>
    <a-card title="书籍分类管理">
      <div>
        <a-input
          style="width: 200px;"
          v-model:value="title"
        />
        &nbsp;
        <a-button type="primary" @click="add">添加</a-button>
      </div>
      <a-divider />
      <div>
        <a-table
          bordered
          :columns="columns"
          :data-source="list"
          :pagination="pagination"
          @change="setPage"
        >
          <template #bodyCell="{ record, column }">
            <template v-if="column.dataIndex === 'actions'">
              <a-button type="primary" @click="updateTitle(record)">修改</a-button>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <a-button type="danger" @click="remove(record._id)">删除</a-button>
            </template>
          </template>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script lang="jsx">
import { defineComponent,ref,computed,onMounted } from 'vue'
import { bookClassify } from '@/service'
import { result } from '@/utils/result'
import { message,Modal,Input } from 'ant-design-vue'

const columns = [
  {
    title: '分类',
    dataIndex: 'title'
  },
  {
    title: '操作',
    dataIndex: 'actions'
  }
]

export default defineComponent({
  setup () {
    const total = ref(0)
    const current = ref(1)
    const pageSize = ref(3)
    const list = ref([])
    const title = ref('')


    // 获取书籍分类列表
    const getList = async () => {
      const res = await bookClassify.list()
      result(res)
      .success(({data}) => {
        list.value = data
        console.log(data);
      })
    }

    // 添加书籍分类
    const add = async () => {
      const res = await bookClassify.add(title.value)
      result(res)
      .success(({data}) => {
        console.log(data);
        getList()
      })
    }

    // 删除书籍分类
    const remove = async (id) => {
      const res = await bookClassify.remove(id)
      getList()
      result(res)
      .success(({msg}) => {
        message.success(msg)
      })
    }

    // 更新书籍分类名称
    const updateTitle = async ({_id,title}) => {
      Modal.confirm({
        title: `修改书籍分类名称`,
        content: (
          <div>
            <Input class="__book_classify_title" />
          </div>
        ),
        onOk:async () => {
          const title = document.querySelector('.__book_classify_title')
          const res = await bookClassify.updateTitle(_id,title.value)
          result(res)
          .success(({msg}) => {
            message.success(msg)
            getList()
          })
        }
      });
    }

    // 切页
    const setPage = ({current:c}) => {
      current.value = c
      getList()
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

    return {
      total,
      list,
      current,
      pageSize,
      pagination,
      getList,
      add,
      title,
      columns,
      setPage,
      remove,
      updateTitle
    }
  }
})
</script>

<style scoped>

</style>