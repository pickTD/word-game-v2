<template>
  <div class="endgame-table">
    <table class="endgame-table__main">
      <tr class="endgame-table__list-header">
        <th @click="sortBy('order')">№</th>
        <th @click="sortBy('word')">Слово</th>
        <th @click="sortBy('time')">Время</th>
      </tr>
      <tr
        class="endgame-table__item"
        v-for="item in sortedResult"
        :key="item.order"
      >
        <td>{{ item.order }}</td>
        <td>{{ item.word }}</td>
        <td>{{ item.time }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'EndgameTable',
  props: {
    played: { type: Array, required: true },
  },
  data() {
    return {
      sortParam: 'order',
    };
  },
  computed: {
    sortedResult() {
      const result = [...this.played];
      return result.sort((a, b) => {
        if (a[this.sortParam] < b[this.sortParam]) {
          return -1;
        }
        if (a[this.sortParam] > b[this.sortParam]) {
          return 1;
        }
        return 0;
      });
    },
  },
  methods: {
    sortBy(param) {
      this.sortParam = param;
    },
  },
};
</script>

<style scoped lang="stylus">
.endgame-table
  width 500px
  height 300px
  padding 30px
  background rgba(255, 255, 255, .9)
  border 1px solid green
  border-radius .5em
  &__main
    width 100%
  &__item
    padding .5em 0
</style>
