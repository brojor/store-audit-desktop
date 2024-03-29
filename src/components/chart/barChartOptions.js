function splitStringToRows(input, rowLength) {
  let curr = rowLength;
  let prev = 0;
  const output = [];
  while (input[curr]) {
    // eslint-disable-next-line no-plusplus
    if (input[curr++] === ' ') {
      output.push(input.substring(prev, curr - 1));
      prev = curr;
      curr += rowLength;
    }
  }
  output.push(input.substring(prev));
  return output;
}

const options = {
  responsive: true,
  layout: {
    padding: 30,
  },
  parsing: {
    xAxisKey: 'label',
    yAxisKey: 'deficiencies',
  },
  plugins: {
    tooltip: {
      titleAlign: 'center',
      displayColors: false,
      padding: 10,
      callbacks: {
        label(context) {
          const { dataIndex } = context;
          const { label } = context.dataset.data[dataIndex];
          // eslint-disable-next-line no-underscore-dangle
          if (context.chart.config._config.options.parsing.xAxisKey === 'label') {
            return null;
          }
          return splitStringToRows(label, 75);
        },
        title([context]) {
          const { dataIndex, dataset } = context;
          const { id } = dataset.data[dataIndex];
          return `${id} (${context.formattedValue})`;
        },
      },
    },
  },
  scales: {
    xAxis: {
      ticks: {
        callback(value, index) {
          const label = this.getLabelForValue(index);
          return splitStringToRows(label, 8);
        },
        autoSkip: false,
        font: {
          size: 12,
        },
      },
    },
  },
};

export default options;
