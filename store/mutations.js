import state from "./state.js";

export default {
  SET_SYNC_STATUS(state, status){
    state.syncStatus = status;
  }
};
