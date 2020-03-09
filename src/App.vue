<template>
  <div id="app">
    <game-field />
    <endgame-modal v-if="gameState === 'endround' || gameState === 'endgame'" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EndgameModal from './components/EndgameModal.vue';
import GameField from './components/GameField.vue';

export default {
  name: 'app',
  components: {
    GameField,
    EndgameModal,
  },
  computed: {
    ...mapState(['gameState']),
  },
};
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
