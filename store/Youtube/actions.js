import state 												from "./state.js";

export default {
  async getVideo({ }, id){
    return await this.$axios.get(`${this.getters.serverEndpoint}/youtube/video/${ id }`);
  },
  async downloadVideo({ }, id){
    return await this.$axios.get(`${this.getters.serverEndpoint}/youtube/download/${ id }`);
  }
}
