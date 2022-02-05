<template>
  <header>
    <div class="header-row">
      <div class="left">
        <date-selector :dateRange="dateRange" @change="emitChange('dateRange', $event)" />
      </div>
      <div class="right">
        <universal-selector :options="storeOptions" @change="emitChange('storesFilter', $event)" />
      </div>
    </div>
    <div class="header-row">
      <chart-filter
        v-for="(filter, i) in filters"
        :key="`filter-${i}`"
        :name="filter.name"
        :options="filter.options"
        @change="emitChange(filter.type, $event)"
      />
    </div>
  </header>
</template>

<script>
import { getStoresFilterOptions } from '../services/chartService';
import DateSelector from './DateSelector.vue';
import UniversalSelector from './universalSelector.vue';
import ChartFilter from './chartFilter.vue';

export default {
  props: ['dateRange'],
  components: {
    DateSelector,
    UniversalSelector,
    ChartFilter,
  },
  data() {
    return {
      filters: [
        {
          name: 'zobrazit',
          type: 'detailLevel',
          options: [
            { id: 'categories', title: 'Celé kategorie' },
            { id: 'points', title: 'Jednotlivé body' },
          ],
        },
        {
          name: 'řazení',
          type: 'sortBy',
          options: [
            { id: 'id', title: 'Podle jména' },
            { id: 'deficiencies', title: 'Podle nedostatků' },
          ],
        },
      ],

      storeOptions: [],
    };
  },
  methods: {
    emitChange(type, value) {
      this.$emit('change', { type, value });
    },
  },

  mounted() {
    getStoresFilterOptions().then(({ data }) => {
      this.storeOptions = data;
      this.emitChange('storesFilter', data[0]);
    });
  },
};
</script>

<style>
.header-row {
  display: flex;
  align-items: stretch;
  background-color: #e60001;
}
.header-row:nth-child(2) {
  background: #f1a0a0;
  justify-content: space-evenly;
  background-color: #fff;
  border-bottom: 1px solid rgb(148, 148, 148);
}

.left {
  width: 50%;
  padding: 1rem;
}
.right {
  display: flex;
  justify-content: center;
  width: 50%;
  align-items: center;
  padding: 0 4rem;
}
</style>
