<template>
  <main>
    <h1>Desktop view</h1>
    <div class="totalPerc">
      <div class="col1">Celkový počet procent</div>
      <div class="col2">98%</div>
      <div class="col2">93%</div>
      <div class="col2">85%</div>
    </div>
    <div
      v-for="(katVal, katKey, katIndex) in dataStore"
      :key="katIndex"
      class="kategory"
    >
      <div class="row">
        <h3 class="title col1">{{ kategories[katKey] }}</h3>
        <div class="pointPerc col2">33%</div>
        <div class="pointPerc col2">45%</div>
        <div class="pointPerc col2">78%</div>
      </div>
      <div class="points">
        <div
          class="row"
          v-for="(pointVal, pointKey, pointIndex) in katVal"
          :key="pointIndex"
        >
          <div class="pointName col1">{{ points[katKey][pointKey] }}</div>
          <div class="status col2">splněno</div>
          <div class="status col2">splněno</div>
          <div class="status col2">splněno</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import dataStore from '../../dataStore';
import { kategories, points, weights } from '../../names';

export default {
  name: 'DesktopView',

  data() {
    return {
      dataStore,
      kategories,
      points,
      weights,
    };
  },
};
</script>

<style lang="css" scoped>
h3.title {
  background-color: #fec5bb;
}

.row {
  display: flex;
  border-bottom: 1px solid black;
  /*justify-content: space-between;*/
}
.pointName {
  background: #fcd5ce;
  padding: 0.75rem;
}
.status {
  background: #fae1dd;
  display: flex;
  align-items: center;
  justify-content: center;
}
.col1 {
  border-right: 1px solid black;
  width: 500px;
}
.col2 {
  border-right: 1px solid black;
  width: 100px;
}
.pointPerc {
  background-color: #fec5bb;
}
.totalPerc {
  display: flex;
  background: #783f8e;
  font-size: 1.6rem;
}
.totalPerc div {
  padding: 0.5rem;
}
</style>
