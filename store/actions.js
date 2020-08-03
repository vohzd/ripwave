//const moment = require("moment");
function parseISO8601Duration(duration) {
    const match = duration.match(/P(\d+Y)?(\d+W)?(\d+D)?T(\d+H)?(\d+M)?(\d+S)?/)
    // An invalid case won't crash the app.
    if (!match) {
        console.error(`Invalid YouTube video duration: ${duration}`)
        return 0
    }
    const [
        years,
        weeks,
        days,
        hours,
        minutes,
        seconds
    ] = match.slice(1).map(_ => _ ? parseInt(_.replace(/\D/, '')) : 0)
  return (((years * 365 + weeks * 7 + days) * 24 + hours) * 60 + minutes) * 60 + seconds
}

const moment = require("moment");


export default {

  async convertToMp3({ }, fileName){
    return await this.$axios.post(`${this.getters.serverEndpoint}/convert/mp3/`, {
      fileName
    });
  },

/*
 * determineTimestamps({ vuexMethods }, youtubeApiResult)
 * returns array of objects with track names and start times
 * this just supports youtube descriptions for now, but probably needs expanding to pull from wikipedia, discogs, musicbrainz etc
 */
  async determineTimestamps({ }, video){
    console.log(video);

    const description = video.items[0].snippet.description;
    const videoLength = video.items[0].contentDetails.duration;

    console.log(videoLength)
    const duration = parseISO8601Duration(videoLength)

    console.log(duration)

    //console.log(moment.duration((duration * 1000)))

    const lines = description.split(/\r?\n/);

    const trackNumberFinder = /([0-9]?[0-9])./
    const timestampFinder = /(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]\d)/

    let tracks = [];

    lines.forEach((line, i) => {
      const match = timestampFinder.exec(line);
      if (match){
        const timestamps = match;
        let lineWithoutTimestamps = line.replace(timestampFinder, "").trim().replace("()", "");
        console.log("TIMESTAMP")
        console.log(timestamps)
        tracks.push({
          name: lineWithoutTimestamps.replace(trackNumberFinder, "").trim(),
          start: timestamps[0]
        });
      }
    });

    return tracks;
  },

  async downloadVideo({ }, id){
    return await this.$axios.get(`${this.getters.serverEndpoint}/youtube/download/${ id }`);
  },

  async getVideo({ }, id){
    return await this.$axios.get(`${this.getters.serverEndpoint}/youtube/video/${ id }`);
  },

  async splitMp3({ }, payload){
    return await this.$axios.post(`${this.getters.serverEndpoint}/split/mp3/`, payload );
  },

}
