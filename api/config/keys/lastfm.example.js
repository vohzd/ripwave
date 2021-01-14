let ret;

if (process.env.NODE_ENV == "development"){
  ret = {
    key: "RANDOM_ID",
    secret: "SOME_RANDOM_STRING"
  }
}
else {
  ret = {
    key: process.env.LASTFM_KEY,
    secret: process.env.LASTFM_SECRET
  }
}

module.exports = ret;
