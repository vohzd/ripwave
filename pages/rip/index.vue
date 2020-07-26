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
      <div class="c30 mr">
        <iframe :src="`https://www.youtube.com/embed/${id}`" frameborder="0" allow="autoplay; encrypted-media" class="row min-height" allowfullscreen ></iframe>
      </div>
      <div class="c70 ml">
        <div class="progress-indicator ">
          <span class="progress-item mr" :class="{ 'active': stage === 0 }">READY TO ROCK</span>
          <span class="progress-item mr" :class="{ 'active': stage === 1 }">RETREIVING TIMESTAMPS</span>
          <span class="progress-item mr" :class="{ 'active': stage === 2 }">FOUND {{ numItems }} ITEMS</span>
          <span class="progress-item mr" :class="{ 'active': stage === 3 }">DOWNLOADING VIDEO</span>
          <span class="progress-item mr" :class="{ 'active': stage === 4 }">CONVERTING TO MP3</span>
          <span class="progress-item mr" :class="{ 'active': stage === 5 }">SPLITTING</span>
          <span class="progress-item mr" :class="{ 'active': stage === 6 }">CEASED</span>
        </div>
      </div>
    </div>
    <div class="row">
      download here: {{ downloadURL }}
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
      buttonText: "Start Ripping",
      isLoading: false,
      isDisabled: false,
      stage: 0,
      numItems: 0,
      downloadURL: null
    }
  },
  methods: {
    ...mapActions([
      "convertToMp3",
      "downloadVideo"
    ]),
    async handleForm(){
      this.ripwave();
    },
    determineTimestamps(){
      // something like this
      // google's json looks like this;
      //console.log(this.video.items[0].snippet.description)
      //video.items[0].snippet.description
      return {
        timestamps: ["00:00", "03:00", "06:00"]
      }
    },
    async ripwave(){
      // need to actually get them
      // await this.determineTimestamps();
      this.stage = 2;
      this.numItems = 7;
      this.stage = 3;
      // doing this over HTTP/REST is pretty awful
      // then if the conversion needs to go ahead, set up a websocket connection to keep the client informed of progress
      const dlReq = await this.downloadVideo(this.id);
      this.stage = 4;
      const convertReq = await this.convertToMp3(dlReq.data.fileName)
      this.stage = 5;
      this.stage = 6;
      this.downloadURL = convertReq.data.audioFile;
      console.log(file)
    },
  }
}
</script>

<style lang="css">

  .progress-indicator .progress-item {
    font-size: 64px;
    opacity: 0.15;
    text-transform: uppercase;
    transition: 0.5s all;
  }

  .progress-indicator .progress-item.active {
    opacity: 0.9;
  }



</style>
