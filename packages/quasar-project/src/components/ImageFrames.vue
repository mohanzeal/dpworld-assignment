<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "src/modules/auth/auth.store";
import { getUserImages } from "../modules/common/common.api";

const props = defineProps({
  userId: {
    type: String,
    required: true,
    default: null,
  },
});
const authStore = useAuthStore();
const slide = ref("1");
const autoplay = ref(false);
const fullscreen = ref(false);
const imagesList = ref<{ id: string; src: string }[]>([]);

onMounted(async () => {
  const userId = authStore.user._id;
  const response = await getUserImages(props.userId ? props.userId : userId);
  if (response.success && response.images.length) {
    imagesList.value = response.images.map((image: any) => {
      return {
        id: image._id,
        src: `http://localhost:4000${image.path}`,
      };
    });

    slide.value = imagesList.value[0]["id"];
  }
});

const shareWhatsApp = (url: string) => {
  const message = "Check out this image: " + url;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl);
};
</script>

<template>
  <div class="web-cam-container" v-if="imagesList.length">
    <q-carousel
      animated
      v-model="slide"
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      v-model:fullscreen="fullscreen"
    >
      <q-carousel-slide
        :name="image.id"
        class="q-pa-none"
        v-for="image in imagesList"
      >
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <q-img class="rounded-borders col-12 full-height" :src="image.src" />
          <q-carousel-control position="top-right" :offset="[18, 18]">
            <q-btn
              no-caps
              dense
              label="Share"
              color="white"
              icon-right="img:/whatsapp.svg"
              text-color="primary"
              @click="shareWhatsApp(image.src)"
            />
          </q-carousel-control>
        </div>
      </q-carousel-slide>

      <template v-slot:control>
        <q-carousel-control position="bottom-right" :offset="[18, 18]">
          <q-btn
            push
            round
            dense
            color="white"
            text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
    <div class="text-center q-ma-md" v-if="!props.userId">
      <q-btn
        color="primary"
        to="/images-list"
        no-caps
        label="Show All User Images"
      />
    </div>
  </div>
  <div v-else class="text-center bg-white">no images found.</div>
</template>
<style>
.web-cam-container {
  border: 1px solid grey;
  border-radius: 5px;
  min-height: 300px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
