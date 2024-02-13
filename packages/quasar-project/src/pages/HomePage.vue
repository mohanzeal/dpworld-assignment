<script setup lang="ts">
import { ref } from 'vue';
import LiveStreaming from '../components/LiveStreaming.vue';

const tab = ref('stream');
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
      <q-tab-panels v-model="tab" animated class="shadow-2 rounded-borders">
        <q-tab-panel name="stream">
          <LiveStreaming />
        </q-tab-panel>
        <q-tab-panel name="images">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
        <q-tab-panel name="videos">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>
