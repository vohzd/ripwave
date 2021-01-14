//const moment = require("moment");
/*
 * returns length of a youtube duration in actual seconds
 */
function parseISO8601(timestamp) {
  const match = timestamp.match(/P(\d+Y)?(\d+W)?(\d+D)?T(\d+H)?(\d+M)?(\d+S)?/);

  if (!match) return 0;
  const [ years, weeks, days, hours, minutes, seconds ] = match.slice(1).map(_ => _ ? parseInt(_.replace(/\D/, '')) : 0)
  return { years, weeks, days, hours, minutes, seconds}

  // converts it to seconds
  //return (((years * 365 + weeks * 7 + days) * 24 + hours) * 60 + minutes) * 60 + seconds

}

//const moment = require("moment");

import {
  parseISO,
  formatISODuration
}               from "date-fns";

export default {

  async convertToMp3({ }, fileName){
    return await this.$axios.post(`api/convert/mp3/`, {
      fileName
    });
  },

/*
 * determineTimestamps({ vuexMethods }, youtubeApiResult)
 * returns array of objects with an array of tracks, start and end timestamps
 * end timestamps require knowing what the duration of the video itself is.
 * https://developers.google.com/youtube/v3/docs/videos#contentDetails.duration
 */
  async determineTimestamps({ }, video){

    const description = video.items[0].snippet.description;
    const videoLength = video.items[0].contentDetails.duration;
    const lines = description.split(/\r?\n/);
    const trackNumberFinder = /([0-9]?[0-9])./;
    const timestampFinder = /(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]\d)/;

    //console.log("wtf do i do with this?!");
    //console.log(videoLength);
    console.log(parseISO8601(videoLength));
    //console.log(formatISODuration(videoLength));

    let tracks = [];

    /* loop all lines, and extract some useful stuff */
    lines.forEach((line, i) => {
      const timestamp = timestampFinder.exec(line);
      if (timestamp){
        let lineWithoutTimestamps = line.replace(timestampFinder, "").trim().replace("()", "").replace("-", "");

        //console.log("testing...");
        //console.log(timestamp[0]);
        tracks.push({
          name: lineWithoutTimestamps.replace(trackNumberFinder, "").trim(),
          start: timestamp[0],
          end: 0,
        });
      }
    });

    return tracks;
  },

  async downloadVideo({ }, id){
    return await this.$axios.get(`api/youtube/download/${ id }`);
  },

  async getVideo({ }, id){
    return await this.$axios.get(`api/youtube/video/${ id }`);
  },

  async splitMp3({ }, payload){
    return await this.$axios.post(`api/split/mp3/`, payload );
  },

}
