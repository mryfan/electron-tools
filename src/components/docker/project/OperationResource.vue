<template>
  <n-card title="操作">
    <template #header-extra>
      <n-alert type="info">
        {{ projectPath }}
      </n-alert>
    </template>
    <n-space>
      <n-button type="info" dashed @click="handleClick">
        {{ titleText }}
      </n-button>
      <n-modal
        v-model:show="showModal"
        class="custom-card"
        preset="card"
        :title="titleText"
        size="huge"
        style="
          width: 800px;
          position: fixed;
          right: 100px;
          left: 100px;
          top: 50px;
        "
      >
        <create-project @close-modal="closeModal" />
      </n-modal>

      <n-button type="info" dashed @click="handleClickProjectDir"
        >修改项目目录</n-button
      >
      <modify-project-dir
        :showModal="modifyProjectDirShowModel"
        @close="handleCloseModifyProjectDirShowModel"
        @flushPathDir="flushPathDir"
      />
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NSpace, NButton, NModal, NAlert } from "naive-ui";
import CreateProject from "./CreateProject.vue";
import ModifyProjectDir from "./ModifyProjectDir.vue";
import { ref, onMounted } from "vue";
import { useListReloadCounterStore } from "@/stores/docker-project/external-event-bus";
const counter = useListReloadCounterStore();

const titleText = ref("创建项目");

//处理点击创建项目按钮
async function handleClick() {
  showModal.value = true;
}
//模态框控制
const showModal = ref(false);

async function closeModal() {
  showModal.value = false;
  counter.increment();
}

//项目目录相关
const projectPath = ref("");

async function getProjectDir() {
  let project_path: string = await window.el_store.get("project_path");
  if (!project_path) {
    projectPath.value = "请先设置项目挂载的根目录";
  } else {
    projectPath.value = "挂载根目录:" + project_path;
  }
}

onMounted(async () => {
  getProjectDir();
});
const modifyProjectDirShowModel = ref(false);
function handleClickProjectDir() {
  modifyProjectDirShowModel.value = true;
}
function handleCloseModifyProjectDirShowModel() {
  modifyProjectDirShowModel.value = false;
}

function flushPathDir() {
  getProjectDir();
}
</script>

<style lang="scss" scoped></style>
