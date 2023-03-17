<template>
  <div>
    <a-card>
      <h2>用户管理</h2>
      <a-divider></a-divider>
      <space-between>
        <div class="search">
          <a-input-search
            placeholder="根据账户搜索"
            v-model:value="keyword"
            @search="onSearch"
            enter-button
          />
        </div>

        <div>
          <a-button @click="showModal = true">添加用户</a-button>
          &nbsp;
          <a-upload
            action="http://localhost:3000/upload/file"
          >
          <!-- :headers="headers" -->
            <a-button type="primary">上传 Excel 添加</a-button>
          </a-upload>
        </div>
      </space-between>

      <a-divider></a-divider>

      <div>
        <a-table
        :columns="columns"
        :data-source="list"
        bordered
        :pagination="pagination"
        @change="setPage"
        >
          <template #bodyCell="{ record,  column}">
            <!-- 创建时间 -->
            <template v-if="column.dataIndex === 'createAt'">
              {{ formatTimestamp(record.meta.createAt) }}
            </template>
            <!-- 角色 -->
            <template v-if="column.dataIndex === 'character'">
              <a href="javascript:;" @click="onEdit(record)">
                <EditOutlined />
              </a>
              {{ getCharacterInfoById(record.character).title }}
            </template>
            <!-- 操作 -->
            <template v-if="column.dataIndex === 'actions'">
              <a href="javascript:;" @click="resetPassword(record)">重置密码</a>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <a href="javascript:;" @click="remove(record)">删除</a>
            </template>
          </template>
        </a-table>
      </div>
    </a-card>
    <a-modal
      title="修改角色"
      v-model:visible="showEditCharacterModal"
      @ok="updateCharacter"
    >
      <a-select
        v-model:value="editForm.character"
        style="width: 220px;"
      >
        <a-select-option v-for="item in characterInfo" :key="item._id" :value="item._id">
          {{ item.title }}
        </a-select-option>
      </a-select>
    </a-modal>
    <AddOne v-model:show="showModal" @getList="getUser"/>
  </div>
</template>

<script >
import { defineComponent,ref,onMounted,computed,watch,reactive } from 'vue'
import AddOne from './AddOne/index.vue'
import { user } from '@/service'
import { result } from '@/utils/result'
import { message } from 'ant-design-vue'
import store from '@/store'
import { EditOutlined } from '@ant-design/icons-vue';
import { formatTimestamp } from '@/utils/formatTimestamp.js'
import { getCharacterInfoById } from '@/utils/character'

const columns = [
  {
    title: '账户',
    dataIndex: 'account'
  },
  {
    title: '角色',
    dataIndex: 'character'
  },
  {
    title: '创建日期',
    dataIndex: 'createAt'
  },
  {
    title: '操作',
    dataIndex: 'actions'
  }
]

export default defineComponent({
  components: {
    EditOutlined,
    AddOne
  },
  setup () {
    const curPage = ref(1)   // 当前页码
    const list = ref([])   // 用户列表
    const total = ref(0)  // 总数
    const showModal = ref(false)   // 显示添加用户面板
    const currentPage = ref(1)    // 当前页码
    const size = ref(10)   // 每页条数
    const keyword = ref('')  // 搜索关键字
    const showEditCharacterModal = ref(false) 
    const editForm = reactive({
      character: '',
      current: {}
    })


    // 获取用户列表
    const getUser = async () => {
      const res = await user.list({page: curPage.value,size:10,keyword:keyword.value})
      result(res)
      .success(({data:{total:resTotal,list: resList}}) => {
        list.value = resList
        total.value = resTotal
      })
    }

    const onEdit = (record) => {
      showEditCharacterModal.value = true
      editForm.current = record
      editForm.character = record.character
    }

    // 点击删除某个用户
    const remove = async ({_id}) => {
      const res = await user.remove(_id)
      result(res)
      .success(({msg}) => {
        message.success(msg)
        getUser()
      })
    }

    // 点击换页
    const setPage = (pagination) => {
      currentPage.value = pagination.current
      getUser()
    }
    // 实现分页功能
    const pagination = computed(() => ({
      total: total.value,
      current: currentPage.value,
      pageSize: size.value
    }))

    // 点击重置密码
    const resetPassword = async ({ _id }) => {
        const res = await user.resetPassword(_id)
        result(res)
        .success(({msg}) => {
          message.success(msg)
        })
    }

    // 点击搜索
    const onSearch = () => {
      getUser()
    }

    // 点击ok
    const updateCharacter = async () => {
      const res = await user.editCharacter(editForm.character,editForm.current._id)

      result(res)
      .success(({msg}) => {
        message.success(msg)
        showEditCharacterModal.value = false
        editForm.current.character = editForm.character
      })
    }

    watch(() => keyword.value, (newValue) => {
      if ( !newValue ) getUser()
    })

    onMounted(() => {
      getUser()
    })

    return {
      onMounted,
      curPage,
      list,
      total,
      columns,
      formatTimestamp,
      remove,
      showModal,
      pagination,
      setPage,
      resetPassword,
      keyword,
      onSearch,
      getCharacterInfoById,
      getUser,
      showEditCharacterModal,
      characterInfo:store.state.characterInfo,
      editForm,
      onEdit,
      updateCharacter
    }
  }
})
</script>

<style scoped lang="scss">
@import './index.scss'
</style>