<script setup lang="ts">
import { ref } from "vue";
import Camera from "simple-vue-camera";

const action = ref("stop");
const cam = ref<any>(null);

const toggleAction = (currentAction: "play" | "stop") => {
  if (currentAction === "play") {
    action.value = "stop";
  } else {
    action.value = "play";
  }
};
</script>

<template>
  <div class="web-cam-container">
    <div class="text-h6 row items-center q-ma-sm">
      <span class="text-caption">Live Streaming</span>
      <q-spinner-puff v-if="action === 'play'" size="md" color="green" />

      <q-space />
      <q-btn
        no-caps
        @click="toggleAction(action as any)"
        :label="action === 'play' ? 'Stop' : 'Play'"
        :icon="action === 'play' ? 'stop_circle' : 'play_circle'"
      />
    </div>
    <q-separator inset />
    <div v-if="action === 'play'">
      <Camera ref="cam"></Camera>
    </div>
    <div v-else class="row items-center justify-center q-my-xl q-py-xl">
      Please click on play button to start streaming...
    </div>
  </div>
</template>
<style scoped>
.web-cam-container {
  border: 1px solid grey;
  border-radius: 5px;
  min-height: 300px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
