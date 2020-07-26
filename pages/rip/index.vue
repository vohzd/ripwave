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
          <span class="progress-item mr" :class="{ 'active': stage === 0 }">Initiating scan</span>
          <span class="progress-item mr" :class="{ 'active': stage === 1 }">Parsing Description</span>
          <span class="progress-item mr" :class="{ 'active': stage === 2 }">Found {{ foundItems }} parsable items</span>
          <span class="progress-item mr" :class="{ 'active': stage === 3 }">Matching Metadata</span>
          <span class="progress-item mr" :class="{ 'active': stage === 4 }">Parsing Tracks</span>
          <span class="progress-item mr" :class="{ 'active': stage === 5 }">Done</span>
        </div>
      </div>
    </div>
    <div class="row">
      download here: 21373653871
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
      foundItems: 0
    }
  },
  methods: {
    ...mapActions([
      "convertToMp3",
      "downloadVideo"
    ]),
    async handleForm(){
      this.mock();
      // TODO, check if video has been converted (will require a db)
      // doing this over HTTP/REST is pretty awful
      // then if the conversion needs to go ahead, set up a websocket connection to keep the client informed of progress
      const { data } = await this.downloadVideo(this.id);
      console.log(data)
      await this.convertToMp3(data.fileName)

    },
    parseDescriptionIntoTimestamps(){
      console.log("parse me plz")
      //console.log(this.video.items[0].snippet.description)
      //video.items[0].snippet.description
    },
    mock(){
      this.isLoading = true;
      const interval = setInterval(() => {
        console.log("incrementing")
        this.stage++;
      }, 1500);

      setTimeout(() => {
        const interval2 = setInterval(() => {
          this.foundItems++;
        }, 75);
        setTimeout(() => { clearInterval(interval2) }, 1000);
      }, 3000);

      setTimeout(() => {
        clearInterval(interval)
      }, 9001);
    }
  },
  mounted(){
    //this.parseDescriptionIntoTimestamps();
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
