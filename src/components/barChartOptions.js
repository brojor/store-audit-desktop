function formatLabel(str, maxwidth) {
  const sections = [];
  const words = str.split(' ');
  let temp = '';

  words.forEach((item, index) => {
    if (temp.length > 0) {
      const concat = `${temp} ${item}`;

      if (concat.length > maxwidth) {
        sections.push(temp);
        temp = '';
      } else if (index === words.length - 1) {
        sections.push(concat);
        return;
      } else {
        temp = concat;
        return;
      }
    }

    if (index === words.length - 1) {
      sections.push(item);
      return;
    }

    if (item.length < maxwidth) {
      temp = item;
    } else {
      sections.push(item);
    }
  });

  return sections;
}

const options = {
  responsive: true,
  layout: {
    padding: 30,
  },
  parsing: {
    xAxisKey: 'id',
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
          return formatLabel(label, 75);
        },
      },
    },
  },
  scales: {
    xAxis: {
      display: false,
    },
  },
};

export default options;
