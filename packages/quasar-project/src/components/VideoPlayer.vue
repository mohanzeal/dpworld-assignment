<script setup lang="ts">
import { ref } from "vue";

const muted = ref(false);
const overlay = ref(true);
const onEnded = () => {
  console.log("video ended");
};
const options = { quality: { default: "720p" } };
</script>

<template>
  <vue-plyr :options="options">
    <video controls crossorigin="true" playsinline data-poster="poster.jpg">
      <source
        size="720"
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
        type="video/mp4"
      />
    </video>
  </vue-plyr>
</template>
