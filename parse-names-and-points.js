const { katNames, pointNames, weights } = require('./names');

console.log(katNames);

const kategories = [];

for (kat in katNames) {
  const katName = katNames[kat];
  const items = [];
  const points = pointNames[kat];
  for (point in points) {
    const pointName = points[point];
    const pointWeight = weights[kat][point];
    items.push({ name: pointName, weight: pointWeight });
    // console.log();
  }
  //   console.log("-----");
  console.log({ name: katName, items });
}
