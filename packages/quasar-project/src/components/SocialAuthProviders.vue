<script setup lang="ts">
enum AuthProvider {
  SELF = "self",
  GOOGLE = "google",
  LINKEDIN = "linkedin",
}

const authProviders = [
  {
    label: "Google",
    value: AuthProvider.GOOGLE,
    uri: `http://localhost:4000/api/v1/auth/oauth/google`,
    icon: `img:/google.svg`,
  },
  {
    label: "Facebook",
    value: AuthProvider.GOOGLE,
    uri: `http://localhost:4000/api/v1/auth/oauth/google`,
    icon: `img:/facebook.svg`,
  },
  {
    label: "LinkedIn",
    value: AuthProvider.LINKEDIN,
    uri: `http://localhost:4000/api/v1/auth/oauth/linkedin`,
    icon: `img:/linkedin.svg`,
  },
];

const redirectToProvider = (provider: any) => {
  window.location = provider.uri;
};
</script>

<template>
  <div
    class="row q-gutter-sm items-center justify-center social-auth-providers q-pa-sm"
  >
    <div class="col-xs-12 text-center q-ma-md text-h6">Login</div>
    <div class="col-xs-12 row q-gutter-md items-center justify-center">
      <div v-for="provider in authProviders" :key="provider.value">
        <q-btn
          no-caps
          align="around"
          :icon="provider.icon"
          class="q-pa-sm"
          :label="provider.label"
          @click="redirectToProvider(provider)"
        ></q-btn>
      </div>
    </div>
  </div>
</template>
