<script setup lang="ts">
import { ref, watch } from "vue";

const video = ref<any>(null);
const canvas = ref<any>(null);
const recording = ref(false);
let mediaRecorder = null as any;
let recordedChunks = [] as string[];
let snapshotInterval = ref(null) as any;
const currentImage = ref("");
const isPlay = ref(false);

const toggleAction = async (play: boolean) => {
  isPlay.value = !play;

  if (isPlay.value) {
    await startRecording();
  } else {
    stopRecording();
  }
};

const startRecording = async () => {
  try {
    startSnapshotInterval();
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    video.value.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event: any) => {
      recordedChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("video", blob);

      try {
        console.log(formData);
        // const response = await axios.post('/uploadVideo', formData, {
        //   headers: { 'Content-Type': 'multipart/form-data' },
        // });
        // console.log("Video uploaded successfully", response.data);
      } catch (error) {
        console.error("Error uploading video", error);
      }

      recordedChunks = [];
    };

    mediaRecorder.start();
    recording.value = true;
  } catch (error) {
    console.error("Error accessing webcam", error);
  }
};

const stopRecording = () => {
  stopSnapshotInterval();
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    recording.value = false;
  }
};

const takeSnapshot = () => {
  if (!canvas.value) return;

  const context = canvas.value.getContext("2d");
  context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

  const dataURL = canvas.value.toDataURL("image/png");
  const blob = dataURItoBlob(dataURL);
  currentImage.value = URL.createObjectURL(blob);
  const formData = new FormData();
  formData.append("snapshot", blob);

  console.log(formData);

  // axios
  //   .post("/uploadSnapshot", formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   })
  //   .then((response) => {
  //     console.log("Snapshot uploaded successfully", response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error uploading snapshot", error);
  //   });
};

const startSnapshotInterval = () => {
  snapshotInterval.value = setInterval(takeSnapshot, 1000);
};

const stopSnapshotInterval = () => {
  clearInterval(snapshotInterval);
  snapshotInterval.value = null;
};

const dataURItoBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uintArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uintArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mimeString });
};
</script>

<template>
  <div class="web-cam-container">
    <div class="text-h6 row items-center q-ma-sm">
      <span class="text-caption">Live Streaming</span>
      <q-spinner-puff v-if="isPlay" size="md" color="green" />

      <q-space />
      <q-btn
        no-caps
        @click="toggleAction(isPlay)"
        :label="isPlay ? 'Stop' : 'Play'"
        :icon="isPlay ? 'stop_circle' : 'play_circle'"
      />
    </div>
    <q-separator inset />
    <div v-if="isPlay">
      <video style="width: 100%" ref="video" autoplay></video>
      <canvas ref="canvas" style="display: none"></canvas>
      <img style="width: 100%" :src="currentImage" />
    </div>
    <div v-else class="row items-center justify-center q-my-xl q-py-xl">
      Please click on play button to start streaming...
    </div>
  </div>
  <!-- <div>
    <div>
      <button @click="startRecording" :disabled="recording">
        Start Recording
      </button>
      <button @click="stopRecording" :disabled="!recording">
        Stop Recording
      </button>
    </div>
    <div>
      <button @click="startSnapshotInterval" :disabled="snapshotInterval">
        Start Snapshot
      </button>
      <button @click="stopSnapshotInterval" :disabled="!snapshotInterval">
        Stop Snapshot
      </button>
    </div>
    <video ref="video" autoplay></video>
    <canvas ref="canvas"></canvas>
  </div> -->
</template>
