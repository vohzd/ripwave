<template lang="html">
  <main>
    <div class="row mb relative">
      <h1 class="mb">{{ video.items[0].snippet.title }}</h1>
      <div class="medium">
        Published: {{ video.items[0].snippet.publishedAt }}
      </div>
      <div class="medium">
        ID: {{ id }}
      </div>
      <form-button class="absolute-top-right" @click.native="handleForm" :button-text="buttonText" :is-loading="isLoading" :is-disabled="isDisabled"></form-button>
    </div>
    <div class="row mb mt">
        <div class="progress-indicator ">
          <span class="progress-item mr" :class="{ 'active': stage === 0 }">STANDBY</span>
          <span class="progress-item mr" :class="{ 'active': stage === 1 }">HARVESTING VIDEO</span>
          <span class="progress-item mr" :class="{ 'active': stage === 2 }">TRANSMUTING FILE FORMAT</span>
          <span class="progress-item mr" :class="{ 'active': stage === 3 }">DISUNITING TIMESTAMPS</span>
          <span class="progress-item mr" :class="{ 'active': stage === 4 }">IMPLANTING METADATA</span>
          <span class="progress-item mr" :class="{ 'active': stage === 5 }">CEASED</span>
        </div>
    </div>
    <div class="row">
      download here: {{ downloadURL }}
    </div>
    <div class="row flex-wrapper">
      <div class="c50 mr">
        <iframe :src="`https://www.youtube.com/embed/${id}`" frameborder="0" allow="autoplay; encrypted-media" class="row min-height" allowfullscreen ></iframe>
      </div>
      <div class="c50">
        <div class="track-header row mb">
          <div class="c25">start time</div>
          <div class="c75">name</div>
        </div>
        <div class="track row mb" v-for="track in tracks">
          <div class="c25"><input :value="track.start" class="c90 text-center" /></div>
          <div class="c75"><input :value="track.name" /></div>
        </div>
      </div>
    </div>

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
    this.tracks = await this.determineTimestamps(this.video);
  }
}
</script>

<style lang="css">

  .progress-indicator .progress-item {
    font-size: 72px;
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
  }



</style>
