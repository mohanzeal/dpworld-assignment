<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "src/modules/auth/auth.store";
import { getUserVideos } from "../modules/common/common.api";

const authStore = useAuthStore();
const videosList = ref<{ id: string; src: string }[]>([]);

onMounted(async () => {
  const userId = authStore.user._id;
  const response = await getUserVideos(userId);
  if (response.success) {
    videosList.value = response.images.map((image: any) => {
      return {
        id: image._id,
        src: `http://localhost:4000${image.path}`,
      };
    });

    slide.value = videosList.value[0]["id"];
  }
});
const slide = ref("1");
const fullscreen = ref(false);

const muted = ref(false);
const overlay = ref(true);
const onEnded = () => {
  console.log("video ended");
};
const options = { quality: { default: "720p" } };
</script>

<template>
  <div class="web-cam-container">
    <q-carousel
      animated
      infinite
      v-model="slide"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      v-model:fullscreen="fullscreen"
    >
      <q-carousel-slide
        :name="video.id"
        class="q-pa-none"
        v-for="video in videosList"
      >
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <vue-plyr :options="options">
            <video
              controls
              crossorigin="true"
              playsinline
              data-poster="poster.jpg"
            >
              <source size="720" :src="video.src" type="video/webm" />
            </video>
          </vue-plyr>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
