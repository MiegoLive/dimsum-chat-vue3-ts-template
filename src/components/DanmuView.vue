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
  }
})

</script>

<style lang="scss" scoped>

</style>
