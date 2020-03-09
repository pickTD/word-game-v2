<template>
  <div class="endround">
    <h2>Вы выиграли! Повторить?</h2>
    <div class="endround__buttons">
      <a
        class="endround__button"
        @click="$emit('restartGame')"
      >
        Конечно!
      </a>
      <a
        class="endround__button"
        @click="$emit('endGame')"
      >
        Я уже устал
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EndroundPopup',
};
</script>

<style scoped lang="stylus">
.endround
  display flex
  flex-direction column
  justify-content space-around
  width 500px
  height 300px
  padding 30px
  background rgba(255, 255, 255, .9)
  border 1px solid green
  border-radius .5em
  &__buttons
    display flex
    justify-content space-around
  &__button
    display block
    padding 1em
    text-decoration none
    color inherit
    cursor pointer
    border 1px solid green
    border-radius .5em
</style>
