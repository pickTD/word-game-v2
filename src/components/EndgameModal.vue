<template>
  <div class="modal__backdrop">
    <div class="modal__container">
      <endround-popup
        v-if="gameState === 'endround'"
        @restartGame="restartGame"
        @endGame="endGame"
      />
      <endgame-table
        v-if="gameState === 'endgame'"
        :played="played"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import EndroundPopup from './EndroundPopup.vue';
import EndgameTable from './EndgameTable.vue';

export default {
  name: 'EndgameModal',
  components: {
    EndroundPopup,
    EndgameTable,
  },
  computed: {
    ...mapState([
      'gameState',
      'played',
    ]),
  },
  methods: {
    ...mapActions([
      'getWord',
    ]),
    ...mapMutations([
      'SET_GAME_STATE',
    ]),
    restartGame() {
      this.getWord();
    },
    endGame() {
      this.SET_GAME_STATE('endgame');
    },
  },
};
</script>

<style scoped lang="stylus">
.modal
  &__backdrop
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 1
    background rgba(0, 0, 0, .2)
  &__container
    display flex
    justify-content center
    padding-top 130px
    max-width 1280px
    height 100vh
    margin 0 auto
</style>
