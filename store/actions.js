export default {

  async convertToMp3({ }, fileName){
    console.log(fileName)
    return await this.$axios.post(`${this.getters.serverEndpoint}/convert/mp3/`, {
      fileName
    });
  },

  async determineTimestamps({ }, video){
    console.log(video)
    const description = video.items[0].snippet.description;
    const lines = description.split(/\r?\n/);

    const trackNumberFinder = /([0-9]?[0-9])./
    const timestampFinder = /(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]\d)/

    lines.forEach((line, i) => {
      const match = timestampFinder.exec(line);
      if (match){
        const timestamps = match;
        let lineWithoutTimestamps = line.replace(timestampFinder, "").trim();

        // sometimes there will be brackets
        lineWithoutTimestamps = lineWithoutTimestamps.replace("()", "");
        //const trackName = line.replace(timestampFinder, "").trim().split("-")[1].trim();
        //const artist
        console.log(timestamps)
        console.log(lineWithoutTimestamps)

        const lineWithoutTrackNumbers = lineWithoutTimestamps.replace(trackNumberFinder, "").trim();
        console.log(lineWithoutTrackNumbers)
        //console.log(trackName)
      }
    /*
      const pos = line.indexOf("/[0-9]/");
      if (pos > -1){
        console.log(line)
        console.log(pos)
      }*/
    });

    //console.log()
    //video.items[0].snippet.description
    return { timestamps: ["00:00", "03:00", "06:00"] }
  },

  async downloadVideo({ }, id){
    return await this.$axios.get(`${this.getters.serverEndpoint}/youtube/download/${ id }`);
  },

  async getVideo({ }, id){
    return await this.$axios.get(`${this.getters.serverEndpoint}/youtube/video/${ id }`);
  }

}
