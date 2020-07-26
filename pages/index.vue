<template lang="html">
  <main class="center">
    <site-logo></site-logo>
    <section class="row mbx">
      <input placeholder="Enter YouTube URL" v-model="url"/>
      <button class="mt text-center" @click="handleForm">LET RIP</button>
    </section>
    <section>
      <h2>Ever needed to rip a YouTube album into individual .mp3s?</h2>
    </section>
    <section class="mtx">
      <h3>Lorum ipsum?</h3>
      <p>Something something</p>
    </section>
    <section class="mtx">
      <h3>Lorum ipsum?</h3>
      <p>Something something</p>
    </section>
    <section class="mtx">
      <h3>Lorum ipsum?</h3>
      <p>Something something</p>
    </section>
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
      url: null
    }
  },
  methods: {
    handleForm(){
      let id = this.url.split("v=")[1];
          id = id.length !== 11 ? id.split("&")[0] : id;
      this.$router.push(`/rip?id=${ id }`);
    },
    ensureCorrectYoutubeLink(url){
      // todo
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.trim().match(regExp);
      const id = (match && match[2].length === 11) ? match[2] : "dQw4w9WgXcQ";
      return `https://www.youtube.com/embed/${id}`;
    },
  }
}
</script>

<style lang="css">

</style>
