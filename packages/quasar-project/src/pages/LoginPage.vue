<script setup lang="ts">
import { LocalStorage } from "quasar";
import SocialAuthProviders from "src/components/SocialAuthProviders.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { useAuthStore } from "src/modules/auth/auth.store";

const $router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  const token = $router.currentRoute.value?.query?.cb as string;
  if (token) {
    setToken(token);
    $router.push({
      name: "HomePage",
    });
  }
});

const decodeJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

function setToken(token: string) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    authStore.setAccessToken(token);
    authStore.setUser(decodeJwt(token));

    LocalStorage.set("accessToken", token);
  }
}
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <SocialAuthProviders />
  </q-page>
</template>
