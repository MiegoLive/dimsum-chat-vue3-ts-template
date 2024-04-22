<template>
  <TransitionGroup class="container" name="list" tag="div">
    <template v-for="item in items" :key="item.uuid">
      <div class="item">
        <img :src="item.avatar" alt="">
        <div class="name">
          {{ item.name }}
        </div>
        <div class="content" v-html="item.content">
        </div>
      </div>
    </template>
  </TransitionGroup>
</template>

<script lang="ts" setup>
import { onMessage, getBfaceURL } from 'https://cdn.jsdelivr.net/npm/dimsum-chat@0/+esm';
import { ref } from "vue";
import { uuid } from "./Utils";

interface item {
  type: string
  name?: string;
  avatar?: string;
  content?: string;
  uuid: string;
}

const items = ref<item[]>([]);

onMessage(
  (_msg, p) => {
    if (p.type === "comment") {
      const avatar =
        p.avatar ||
        (p.platform === "bilibili" && p.uid ? getBfaceURL(p.uid) : undefined);
      const content = p.getCommentHTML({
        stickerStyle: "height:80px;margin:5px;",
        emotStyle:
          "display:inline-flex;vertical-align:baseline;height:36px;line-height:50px;transform:translateY(4px);",
      });
      items.value.push({
        type: p.type,
        name: p.userName,
        content,
        avatar,
        uuid: uuid()
      })
    }
    if (items.value.length > 20) {
      items.value.shift();
    }
  },
  {
    customWsServer: import.meta.env.DEV
      ? "ws://localhost:13499/websocket"
      : undefined,
  }
);
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-wrap: nowrap;
  align-items: flex-start;
}

.item {
  font-size: 24px;

  > img {
    width: 80px;
  }
}

.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: relative;
}
</style>
