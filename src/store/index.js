import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { shuffle } from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: null,
    actualData: null,
    currentWord: '',
    objective: [],
    solution: [],
    timer: {},
    played: [],
    gameState: '',
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data;
    },
    SET_ACTUAL_DATA(state, data) {
      state.actualData = data;
    },
    SET_CURRENT_WORD(state, word) {
      state.currentWord = word;
    },
    SET_OBJECTIVE(state, wordArr) {
      state.objective = shuffle(wordArr);
    },
    SET_GAME_STATE(state, currentState) {
      state.gameState = currentState;
    },
    SET_TIME(state, time) {
      state.timer = Object.assign(state.timer, time);
    },
    UPDATE_OBJECTIVE(state, i) {
      state.objective = [
        ...state.objective.slice(0, i),
        ...state.objective.slice(i + 1),
      ];
    },
    UPDATE_SOLUTION(state, { i, letter }) {
      state.solution = [
        ...state.solution.slice(0, i),
        letter,
        ...state.solution.slice(i + 1),
      ];
    },
    RESET_SOLUTION(state) {
      state.solution = Array.from({ length: state.currentWord.length });
    },
    UNDO_OBJECTIVE(state, letter) {
      state.objective = shuffle([...state.objective, letter]);
    },
    UNDO_SOLUTION(state, i) {
      state.solution = [
        ...state.solution.slice(0, i),
        undefined,
        ...state.solution.slice(i + 1),
      ];
    },
    COMMIT_WORD(state, word) {
      state.played = [...state.played, word];
    },
  },
  actions: {
    async getData({ commit }, id) {
      const { data } = await axios.get(`https://apidir.pfdo.ru/v1/directory-program-activities/${id}`);
      commit('SET_DATA', data);
    },
    async getWord({ state, commit, dispatch }) {
      const id = Math.floor(2 + Math.random() * 1367);
      await dispatch('getData', id);
      if (
        state.data.result_code === 'FLSCS'
        && state.data.data.status === 10
        && !state.played.some((w) => w.word === state.data.data.name.toUpperCase())
      ) {
        dispatch('setActualData', state.data);
        commit('RESET_SOLUTION');
        commit('SET_GAME_STATE', 'play');
        const time = Date.now();
        commit('SET_TIME', { timeStart: time });
      } else {
        dispatch('getWord');
      }
    },
    setActualData({ commit }, data) {
      commit('SET_ACTUAL_DATA', data);
      commit('SET_CURRENT_WORD', data.data.name.toUpperCase());
      commit('SET_OBJECTIVE', data.data.name.toUpperCase().split(''));
    },
    resetCurrentWord({ state, commit }) {
      commit('RESET_SOLUTION');
      commit('SET_OBJECTIVE', state.actualData.data.name.toUpperCase().split(''));
    },
    undoLastTurn({ state, commit }, i) {
      commit('UNDO_OBJECTIVE', state.solution[i]);
      commit('UNDO_SOLUTION', i);
    },
    endRound({ state, commit }) {
      commit('SET_GAME_STATE', 'endround');
      const time = Date.now();
      commit('SET_TIME', { timeEnd: time });
      const secondsElapsed = (state.timer.timeEnd - state.timer.timeStart) / 1000;
      const minutes = secondsElapsed / 60;
      const seconds = Math.ceil(secondsElapsed % 60);
      const mm = Math.floor(minutes);
      const ss = seconds > 9 ? seconds : `0${seconds}`;
      const humanizedTime = `${mm}:${ss}`;
      commit('COMMIT_WORD', {
        order: (state.played.length + 1),
        word: state.currentWord,
        time: humanizedTime,
      });
    },
  },
});
