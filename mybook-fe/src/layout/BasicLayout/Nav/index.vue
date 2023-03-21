<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px"
    mode="inline"
    v-for="item in menu"
    :key="item.url"
    v-only-admin="item.onlyAdmin"
  >
    <a-sub-menu v-if="item.children">
      <template #title>{{ item.title }}</template>
      <a-menu-item @click="to(child.url)" v-for="child in item.children" :key="child.url">
            {{ child.title }}
      </a-menu-item>
    </a-sub-menu>
    <a-menu-item v-else :key="item.url" @click="to(item.url)">
      {{ item.title }}
    </a-menu-item>
  </a-menu>
</template>

<script>
import { defineComponent,ref,onMounted } from 'vue'
import menu from '../../../config/menu';
import { useRouter,useRoute } from 'vue-router';

export default defineComponent({
  setup () {
    const router = useRouter()
    const route = useRoute()
    const selectedKeys = ref([]);
    const openKeys = ref([]);

    const to = (url) => {
      router.push(url)
    }

    onMounted(() => {
      selectedKeys.value = [route.path]
    })
    return {
      selectedKeys,
      openKeys,
      menu,
      to
    }
  }
})
</script>

<style scoped lang="scss">
div {
  z-index: 100;
}
</style>