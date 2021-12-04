<template>
  <main>
    <div class="container">
      <header>
        <div class="left">
          <date-selector />
        </div>
        <div class="right">prodejny</div>
      </header>
      <div class="chart-wrapper">
        neco
      </div>
    </div>
  </main>
</template>
<script>
import DateSelector from '../components/DateSelector.vue';

export default {
  name: 'ChartView',
  components: { DateSelector },
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
}

.container {
  margin-top: 2rem;
  width: 80vw;
  height: 80vh;
  border: 2px solid black;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

header {
  display: flex;
  align-items: stretch;
  background-color: #e60001;
}

.left {
  width: 50%;
  padding: 1rem;
}

.chart-wrapper {
  background-color: #fff;
flex-grow: 1;
}
</style>
