import state from "./state.js";

export default {
  serverEndpoint: (state) => process.env.SERVER_ENDPOINT,
  syncStatus: (state) =>  state.syncStatus
}
