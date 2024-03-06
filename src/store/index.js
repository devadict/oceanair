import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { filterData } from "../utils.js";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initialoutbound: [],
    initialinbound: [],
    filteredInbound: [],
    filteredOutbound: [],
  },
  mutations: {
    saveInbound(state, payload) {
      state.filteredInbound = state.initialinbound = [...payload];
    },
    saveOutbound(state, payload) {
      state.filteredOutbound = state.initialoutbound = [...payload];
    },
    filterOutbound(state, payload) {
      let data = filterData(state.initialoutbound, payload);
      state.filteredOutbound = [...data];
    },
    filterInbound(state, payload) {
      let data = filterData(state.initialinbound, payload);
      state.filteredInbound = [...data];
    },
  },
  getters: {
    outbound(state) {
      return state.filteredOutbound;
    },
    inbound(state) {
      return state.filteredInbound;
    },
  },
  actions: {
    // searchPlaces(context, query) {
    //   return fetch(
    //     `https://sky-scanner3.p.rapidapi.com/flights/auto-complete`,
    //     {
    //       method: "GET",
    //       params: {query: query},
    //       headers: {'X-RapidAPI-Key': 'e5b4da2efcmsh0c5113656b3c0e7p1db69djsn46690bd96f9e',
    //       'X-RapidAPI-Host': 'sky-scanner3.p.rapidapi.com'}
    //     }
    //   ).then((res) => {
    //     console.log(res);
    //     return (res = res.json());
    //   });
    // },
    async searchPlaces(context, query) {
      console.log(query);
      const options = {
        method: 'GET',
        url: 'https://sky-scanner3.p.rapidapi.com/flights/auto-complete',
        params: { query: query },
        headers: {
          'X-RapidAPI-Key': 'e5b4da2efcmsh0c5113656b3c0e7p1db69djsn46690bd96f9e',
          'X-RapidAPI-Host': 'sky-scanner3.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    // flights(context, payload) {
    //   return fetch(
    //     `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/IN/INR/en-IN/${payload.query.source.id}/${payload.query.dest.id}/${payload.date}?inboundpartialdate=2020-14-04`,
    //     {
    //       method: "GET",
    //       headers: config.header,
    //     }
    //   ).then((res) => {
    //     return (res = res.json());
    //   });
    // },
  },
  modules: {},
});
