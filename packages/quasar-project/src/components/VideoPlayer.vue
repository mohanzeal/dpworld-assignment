<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "src/modules/auth/auth.store";

import {
  getUserAuditLog,
  getUserVideos,
  updateUserActions,
} from "../modules/common/common.api";
import { date, debounce } from "quasar";

const authStore = useAuthStore();

const plyrInstance = ref<any>(null);
const videosList = ref<{ id: string; src: string }[]>([]);
const auditLog = ref<any>([]);

const saveAudit = (action: string) => {
  updateUserActions({
    userId: authStore.user._id,
    action: action,
    entity: slide.value,
  }).then((response) => {
    getUserAuditLog(authStore.user._id).then((res) => {
      if (res.success) {
        auditLog.value = res.audit;
      }
    });
  });
};

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
    const res = await getUserAuditLog(authStore.user._id);
    if (res.success) {
      auditLog.value = res.audit;
    }
    setTimeout(() => {
      plyrInstance.value[0].player.on("play", () => saveAudit("play"));
      plyrInstance.value[0].player.on("pause", () => saveAudit("pause"));
      plyrInstance.value[0].player.on("enterfullscreen", () =>
        saveAudit("maximize")
      );
      plyrInstance.value[0].player.on("exitfullscreen", () =>
        saveAudit("minimize")
      );
      plyrInstance.value[0].player.on(
        "volumechange",
        debounce(() => saveAudit("volume change")),
        500
      );
    }, 500);
  }
});
const slide = ref("1");
const fullscreen = ref(false);
const options = { quality: { default: "720p" } };
</script>

<template>
  <div class="column items-center justify-between">
    <div class="col-xs-8 web-cam-container">
      <q-carousel
        animated
        height="auto"
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
          <div class="row fit justify-start items-center q-col-gutter no-wrap">
            <vue-plyr ref="plyrInstance" :options="options">
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
    <div class="col-xs-4 q-pa-md">
      <div class="text-center text-caption text-bold">Audit Log</div>
      <div v-for="(audit, i) in auditLog" :key="i">
        You clicked on <b>{{ audit.action }}</b> at
        {{ date.formatDate(audit.createdAt, "YYYY-MM-DD hh:mm:ss a") }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.web-cam-container {
  border: 1px solid grey;
  border-radius: 5px;
  min-height: 300px;
  max-width: 500px !important;
  margin: 0 auto;
}
</style>
