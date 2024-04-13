<template>
<div class="marquee" style="max-width: 200px;">
	<span>Lorem ipsum dolor sit amet elit. Animi, aliquid.</span>
</div>
</template>

<script lang="ts" setup>
import { onMessage, getBfaceURL } from 'dimsum-chat';

onMessage((_msg, p) => {
  if(p.type === 'comment') {
    const avatar = p.avatar || (p.platform === "bilibili" && p.uid ? getBfaceURL(p.uid) : undefined);
    const content = p.getCommentHTML({
      stickerStyle: "height:80px;margin:5px;",
      emotStyle: "display:inline-flex;vertical-align:baseline;height:36px;line-height:50px;transform:translateY(4px);"
    })
  }
}, {
  customWsServer: import.meta.env.DEV ? 'ws://localhost:13499/websocket' : undefined
})

</script>

<style lang="scss" scoped>

</style>
