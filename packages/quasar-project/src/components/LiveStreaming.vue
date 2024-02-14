<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue";
import Camera from "simple-vue-camera";

const action = ref("stop");
const cam = ref<any>(null);
const interval = ref<any>(0);

const currentImage = ref("");

const toggleAction = (currentAction: "play" | "stop") => {
  if (currentAction === "play") {
    action.value = "stop";
  } else {
    action.value = "play";
  }
};

const takeImageSnapshot = async () => {
  console.log("take image snapshot");
  const blob = await cam.value?.snapshot();
  const url = URL.createObjectURL(blob);
  currentImage.value = url;
  const fileName = Date.now() + "username.jpg";
};

const started = (args: any) => {
  console.log("started", args);

  interval.value = setInterval(async () => {
    await takeImageSnapshot();
  }, 1000);
};
const stopped = (args: any) => {
  console.log("stopped", args);
  clearInterval(interval.value);
};
const error = (args: any) => {
  console.log("error", args);
};
onUnmounted(() => {
  clearInterval(interval.value);
});
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
      <Camera
        ref="cam"
        @started="started"
        @stopped="stopped"
        @error="error"
      ></Camera>
      <img style="width: 100%" :src="currentImage" />
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
