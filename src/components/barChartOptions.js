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
        // title(context) {
        //   // eslint-disable-next-line no-underscore-dangle
        //   if (context[0].chart.config._config.options.parsing.xAxisKey === 'label') {
        //     const { dataIndex } = context[0];
        //     console.log('title: ', { dataIndex });
        //     return `Kategorie ${Number(dataIndex) + 1}`;
        //   }
        //   console.log(context[0]);
        //   return context[0].label;
        // },
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
