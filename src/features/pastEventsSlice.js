import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";
import contractJSON from "../contracts/contract.json";
import abi from "../contracts/abi.json";

const initialState = {
  pastEvents: [],
  status: "idle",
  error: null,
};

export const fetchPastEvents = createAsyncThunk(
  "fetchPastEvents",
  async (info) => {
    // console.time("checkTime");
    let allPastEvents = localStorage.getItem('get past events')
    if(allPastEvents) return JSON.parse(allPastEvents) 
    allPastEvents = []
    const currBlock = await info.web3.eth.getBlockNumber();
    let block = 29274986;
    const gap = 3499;
    let requests = [];
    while (block < currBlock) {
      requests.push(
        info.contract.getPastEvents("allEvents", {
          fromBlock: block,
          toBlock: block + gap,
        })
      );
      block += gap;
    }
    const pastEvents = await Promise.all(requests);
    for (let i = pastEvents.length; i > 0; i--) {
        allPastEvents = [...allPastEvents, ...pastEvents[i - 1]];
    }
    allPastEvents.sort((a, b) => b.blockNumber - a.blockNumber);
    // console.timeEnd("checkTime");
    localStorage.setItem('get past events',JSON.stringify(allPastEvents))
    return allPastEvents;
  }
);

const pastEventsSlice = createSlice({
  name: "pastEvents",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPastEvents.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPastEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pastEvents = state.pastEvents.concat(action.payload);
      })
      .addCase(fetchPastEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllPastEvents = (state) => state.pastEvents.pastEvents;
export const getPastEventsStatus = (state) => state.pastEvents.status;
export const getPastEventsError = (state) => state.pastEvents.error;

export default pastEventsSlice.reducer;
