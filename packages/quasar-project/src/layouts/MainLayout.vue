<script setup lang="ts">
import { LocalStorage } from "quasar";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/modules/auth/auth.store";
import { computed } from "vue";

const $router = useRouter();
const authStore = useAuthStore();

const userName = computed(() => {
  if (authStore.user && authStore.user.user) {
    return authStore.user.user.name;
  }

  return "User";
});
const logout = () => {
  LocalStorage.clear();
  authStore.accessToken = null;
  authStore.user = {};
  $router.push({ name: "LoginPage" });
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> Assignment </q-toolbar-title>
        <q-space />
        <template v-if="$router.currentRoute.value.name != 'LoginPage'">
          Welcome {{ userName }}
          <q-btn round flat icon="face" />
          <q-btn flat icon="logout" label="Exit" @click="logout" />
        </template>
        <template v-else> Welcom Guest </template>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
