<template>
  <div>
    <a-spin :spinning="loading">
      <a-card>
        <div class="list">
          <div class="item">
            <div class="count">共 {{ baseInfo.total.book }} 本</div>
            <div class="title">书籍</div>
          </div>
          <div class="item">
            <div class="count">共{{ baseInfo.total.user }} 用户</div>
            <div class="title">用户</div>
          </div>
          <div class="item">
            <div class="count">共 {{ baseInfo.total.log }}条</div>
            <div class="title">日志</div>
          </div>
        </div>
      </a-card>
    </a-spin>

    <div class="table-list">
      <div class="left">
        <Books
        :simple="true"
        />
      </div>
      <div class="right">
        <log
          simple
        />
      </div>
    </div>
  </div>
</template>

<script >
import { defineComponent, onMounted, ref } from 'vue';
import { result } from '@/utils/result';
import Books from '@/views/Books/index.vue';
import Log from '@/views/Log/index.vue';
import { dashboard } from '@/service';

export default defineComponent({
  components: {
    Books,
    Log,
  },
  setup() {
    const loading = ref(true);

    const baseInfo = ref({
      total: {
        book: 0,
        user: 0,
        log: 0,
      },
    });

    const getBaseInfo = async () => {
      loading.value = true;
      const res = await dashboard.baseInfo();
      loading.value = false;

      result(res)
        .success(({ data }) => {
          baseInfo.value = data;
        });
    };

    onMounted(() => {
      getBaseInfo();
    });

    return {
      baseInfo,
      loading,
    };
  },
});

</script>

<style scoped lang="scss">
.list {
  display: flex;

  .item {
    flex: 1;

    .title {
      color: #666;
    }

    .count {
      font-weight: 700;
      color: black;
      font-size: 20px;
    }
  }
}

.table-list {
  margin-top: 24px;
  display: flex;

  .left {
    flex: 1;
    margin-right: 12px;
  }

  .right {
    flex: 1;
    margin-left: 12px;
  }
}

</style>