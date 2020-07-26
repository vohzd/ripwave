export default {
  async convertToMp3({ }, fileName){
    console.log(fileName)
    return await this.$axios.post(`${this.getters.serverEndpoint}/convert/mp3/`, {
      fileName
    });
  },
  async getVideo({ }, id){
    return await this.$axios.get(`${this.getters.serverEndpoint}/youtube/video/${ id }`);
  },
  async downloadVideo({ }, id){
    return await this.$axios.get(`${this.getters.serverEndpoint}/youtube/download/${ id }`);
  }
}
