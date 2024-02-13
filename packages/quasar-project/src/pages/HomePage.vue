<script setup lang="ts">
import { ref } from "vue";
import LiveStreaming from "../components/LiveStreaming.vue";
import ImageFrames from "src/components/ImageFrames.vue";
import VideoPlayer from "src/components/VideoPlayer.vue";

const tab = ref("stream");
</script>

<template>
  <q-page class="row items-start justify-center">
    <div class="col-xs-12">
      <q-tabs
        no-caps
        v-model="tab"
        indicator-color="yellow"
        class="bg-purple text-white shadow-2"
      >
        <q-tab label="Streaming" name="stream" />
        <q-tab label="Image Frames" name="images" />
        <q-tab label="Videos" name="videos" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="stream">
          <LiveStreaming />
        </q-tab-panel>
        <q-tab-panel name="images">
          <ImageFrames />
        </q-tab-panel>
        <q-tab-panel name="videos">
          <VideoPlayer />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>
