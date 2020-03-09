<template>
  <main class="game">
    <div class="game__container">
      <h1 class="game__header">Игра в слова</h1>
      <img class="game__img" :src="img">
      <p>
        <a class="game__reset-button button" @click="resetCurrentWord">Сброс</a>
        <a class="game__undo-button button" @click="undo">&#8634;</a>
      </p>
      <ul class="word-container solution">
        <li
          class="solution__letterbox"
          :class="{ 'solution__letterbox--filled': isFilled(i) }"
          v-for="(letter, i) in solution"
          :key="i"
        >
          {{ letter }}
        </li>
      </ul>
      <ul class="word-container objective">
        <li
          class="objective__letterbox"
          v-for="(letter, i) in objective"
          :key="i"
          @click="gameTurn(i)"
        >
          {{ letter }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'GameField',
  computed: {
    ...mapState([
      'actualData',
      'currentWord',
      'objective',
      'solution',
      'played',
      'gameState',
    ]),
    img() {
      return this.actualData && this.actualData.data.img_src;
    },
    currentIndex() {
      return this.solution.filter((l) => l !== undefined).length;
    },
  },
  watch: {
    currentIndex(val) {
      if (val === this.solution.length && this.solution.join('') === this.currentWord) {
        this.endRound();
      }
    },
  },
  mounted() {
    this.getWord();
  },
  methods: {
    ...mapActions([
      'getWord',
      'resetCurrentWord',
      'undoLastTurn',
      'endRound',
    ]),
    ...mapMutations([
      'UPDATE_SOLUTION',
      'UPDATE_OBJECTIVE',
      'RESET_SOLUTION',
    ]),
    currentLetter(i) {
      return this.solution[i];
    },
    isFilled(i) {
      return this.solution[i] !== undefined;
    },
    gameTurn(i) {
      this.UPDATE_SOLUTION({ i: this.currentIndex, letter: this.objective[i] });
      this.UPDATE_OBJECTIVE(i);
    },
    undo() {
      if (this.currentIndex > 0) {
        this.undoLastTurn(this.currentIndex - 1);
      }
    },
    fill() {
      const i = this.currentIndex;
      this.UPDATE_SOLUTION({ i, letter: this.currentWord[i].toUpperCase() });
    },
  },
};
</script>

<style scoped lang="stylus">
.game
  width 100%
  max-width 1280px
  margin 0 auto
  &__header
    margin-bottom 5em
  &__img
    width 300px
    margin -7em 0 1em
  &__reset-button
    width 5em
    margin-right 1.5em
  &__undo-button
    width 2.5em

.button
  display inline-block
  height 2.5em
  line-height 2.5em
  border 1px solid green
  border-radius 5px
  cursor pointer

.word-container
  margin 0
  padding 0
  list-style none
  display flex
  flex-wrap wrap
  justify-content center

.objective,
.solution
  &__letterbox
    width 3em
    height 3em
    line-height 3em
    border 1px solid green
    border-radius 5px
    margin 0 .5em 1em 0
    cursor pointer
    &:last-child
      margin-right 0

.objective
  &__letterbox
    width calc(3em - 2px)
    height calc(3em - 2px)
    background lightgreen
    border none
    &--hidden
      display none

.solution
  margin 3em 0
  &__letterbox
    &--filled
      background lightgreen
</style>
