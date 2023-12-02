<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>CPU</template>
  </WelcomeItem>
  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Mainboard</template>
  </WelcomeItem>
  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>GPU</template>
  </WelcomeItem>
  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Memory</template>
    <div>
    </div>
  </WelcomeItem>
  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Disk</template>
    <div>
    </div>
  </WelcomeItem>
  <div class="but">
    <el-button style="height: 3vw;width: 8vw;color: green" type="提交" round>提交</el-button>
  </div>
</template>
<style scoped>
.but{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}
</style>
