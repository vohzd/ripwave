<template lang="html">
  <main>
    <h1>Tutorial</h1>
    <section>
      <h2>Use correct YouTube URL or ID</h2>
    </section>
    <section>
      <h2>How does this vary from youtube-dl's embed metadata</h2>
      <p>This retreives descriptions using the official youtube api</p>
      <p>youtube-dl ran into troubles in summer 2020 as youtube started restricting descriptions to 160 characters.</p>
      <p>also, if no descrtiption/timestamps are found, ripwave will lookup the album from a number of sources (lastfm, wiki, etc etc)</p>
    </section>
  </main>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
