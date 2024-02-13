<script setup lang="ts">
import { ref } from 'vue';
import Camera from 'simple-vue-camera';

const action = ref('stop');
const cam = ref<any>(null);

const toggleAction = (currentAction: 'play' | 'stop') => {
  if (currentAction === 'play') {
    action.value = 'stop';
  } else {
    action.value = 'play';
  }
};

const onStarted = (stream: any) => {
  console.log('On Started Event', stream);
};
const onStopped = (stream: any) => {
  console.log('On Stopped Event', stream);
};
const onStop = () => {
  cam.value.stop();
};
const onStart = () => {
  cam.value.start();
};
const onError = (error: any) => {
  console.log('On Error Event', error);
};
</script>

<template>
  <div class="">
    <div class="text-h6 row items-center">
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
    <div class="web-cam-container">
      <Camera :resolution="{ width: 375, height: 212 }" ref="cam"></Camera>
    </div>
  </div>
</template>
