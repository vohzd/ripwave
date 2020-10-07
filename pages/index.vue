<template lang="html">
  <main class="center-container">
    <site-logo></site-logo>
    <div class="row mbx  text-center">
      <input placeholder="Enter YouTube URL" v-model="url"/>
      <button class="mt" @click="handleForm">LET RIP</button>
      <div class="radio-buttons mlx mrx mt">
        <span class="radio-button" @click="choosePurpose(0)" :class=" { 'radio-button-selected': isTabSelected(0) } ">
          <label>Split Album</label>
          <input type="radio" />
        </span>
        <span class="radio-button" @click="choosePurpose(1)" :class=" { 'radio-button-selected': isTabSelected(1) } ">
          <label>Don't split</label>
          <input type="radio" />
        </span>
      </div>
    </div>
    <div>
      <h2>Ever needed to rip a YouTube album into individual .mp3s?</h2>
    </div>
    <div class="mtx">
      <h3>Lorum ipsum?</h3>
      <p>Something something</p>
    </div>
    <div class="mtx">
      <h3>Lorum ipsum?</h3>
      <p>Something something</p>
    </div>
    <div class="mtx">
      <h3>Lorum ipsum?</h3>
      <p>Something something</p>
    </div>
  </main>
</template>

<script>


import SiteLogo from "~/components/logo/SiteLogo.vue";

export default {
  components: {
    SiteLogo
  },
  data(){
    return {
      tabSelected: 0,
      url: null
    }
  },
  methods: {
    handleForm(){
      let id = this.url.split("v=")[1];
          id = id.length !== 11 ? id.split("&")[0] : id;
      this.$router.push(`/rip?id=${ id }&mode=${this.tabSelected}`);
    },
    ensureCorrectYoutubeLink(url){
      // todo
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.trim().match(regExp);
      const id = (match && match[2].length === 11) ? match[2] : "dQw4w9WgXcQ";
      return `https://www.youtube.com/embed/${id}`;
    },
    choosePurpose(int){
      this.tabSelected = int;
    },
    isTabSelected(i){
      return this.tabSelected === i ? true : false;
    }
  }
}
</script>

<style lang="css">

</style>
