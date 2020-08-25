<template lang="html">
  <main class="">

    <!-- top text and CTA button -->
    <div class="center-container relative">
      <form-button class="absolute-top-right massive" @click.native="handleForm" :button-text="buttonText" :is-loading="isLoading" :is-disabled="isDisabled"></form-button>
      <h1 class="mb c75">{{ video.items[0].snippet.title }}</h1>

      <div class="row">
        <div class="">Published: {{ video.items[0].snippet.publishedAt }}</div>
        <div class="">ID: {{ id }}</div>
      </div>
    </div>


    <!-- youtube video and track list -->

    <div class="center-container mtx two-uneven-grid grid">
      <div>
        <h2 class="mb">Video</h2>
        <iframe :src="`https://www.youtube.com/embed/${id}`" frameborder="0" allow="autoplay; encrypted-media" class="row min-height" allowfullscreen ></iframe>
      </div>
      <div class="mlx">
        <h2 class="mb">Tracks</h2>
        <div class="track-header mb three-uneven-grid grid">
          <div class="">track number</div>
          <div class="">start time</div>
          <div class="">name</div>
        </div>
        <div class="track mb three-uneven-grid grid" v-for="(track, i) in tracks">
          <div class=""><input :value="i + 1" class="c90 text-center" /></div>
          <div class=""><input :value="track.start" class="c90 text-center" /></div>
          <div class="relative">
            <input :value="track.name" />
            <div class="absolute-top-right">
              x
            </div>
          </div>
        </div>
      </div>
    </div>


    <footer>
      <div class="progress-indicator  ">
        <span class="progress-item" :class="{ 'active': stage === 0 }">STANDBY</span>
        <span class="progress-item" :class="{ 'active': stage === 1 }">HARVESTING VIDEO</span>
        <span class="progress-item" :class="{ 'active': stage === 2 }">TRANSMUTING FILE FORMAT</span>
        <span class="progress-item" :class="{ 'active': stage === 3 }">DISUNITING TIMESTAMPS</span>
        <span class="progress-item" :class="{ 'active': stage === 4 }">IMPLANTING METADATA</span>
        <span class="progress-item" :class="{ 'active': stage === 5 }">CEASED</span>
      </div>
    </footer>


  </main>
</template>

<script>

import { mapActions, mapGetters } from "vuex";

import FormButton from "~/components/form/FormButton.vue";

export default {
  async asyncData({ store, query }){
    // todo double check this is a youtube id fragment (create a helper)
    if (query.id){
      const { data } = await store.dispatch("getVideo", query.id);
      return { video: data, id: query.id }
    }
  },
  components: {
    FormButton
  },
  data(){
    return {
      buttonText: "START",
      downloadURL: null,
      isLoading: false,
      isDisabled: false,
      stage: 0,
      tracks: []
    }
  },
  methods: {
    ...mapActions([
      "convertToMp3",
      "determineTimestamps",
      "downloadVideo",
      "splitMp3"
    ]),
    async handleForm(){
      this.ripwave();
    },
    async ripwave(){


      /*
       * doing this over HTTP/REST is pretty awful
       * then if the conversion needs to go ahead, set up a websocket connection to keep the client informed of progress
       */

       /*
      this.stage = 1;
      const dlReq = await this.downloadVideo(this.id);
      this.stage = 2;
      const convertReq = await this.convertToMp3(dlReq.data.fileName)
      this.stage = 3;
      */
      const splitReq = await this.splitMp3({
        id: this.id,
        tracks: this.tracks
      });
      /*
      this.downloadURL = convertReq.data.audioFile;
      console.log(file)*/
    },
  },
  async mounted(){
    /* DO THIS SSR */
    this.tracks = await this.determineTimestamps(this.video);
  }
}
</script>

<style lang="css">

  /* if you want it to go over one line
  .progress-indicator {
    display: grid;
    grid-auto-flow: column;

  }*/

  /* sits in the bottom right corner */
  .progress-indicator {
    display: grid;
    grid-auto-rows: min-content;
    text-align: right;
  }

  .progress-indicator .progress-item {
    font-size: 32px;
    opacity: 0.05;
    font-family: "share-tech";
    letter-spacing: 6px;
    text-transform: uppercase;
    transition: 0.5s all;
  }

  .progress-indicator .progress-item.active {
    opacity: 0.9;
  }

  .track input {
    padding: 8px;
    font-size: 20px;
  }



</style>
