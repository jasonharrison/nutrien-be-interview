const express = require('express')
const fs = require('fs');
const {parse} = require('csv-parse/sync');
const app = express()
const PORT = 3123;
const projection2021data = fs.readFileSync('Projection2021.csv').toString();
const projection2021records = parse(projection2021data, {
  delimiter: ",",
  columns: true,
  skip_empty_lines: true,
});
// Init hashmap - {Commodity: { Rice: 1, Barley: 2 }, CommodityType: { ... }}

app.get('/:reqColumnName', (req, res) => {
  const seenValues = {}; // {Rice: 1, Barley: 2} ...
  const {reqColumnName} = req.params;
  for (let record of projection2021records) {
    if (record[reqColumnName] in seenValues) {
      seenValues[record[reqColumnName]] += 1;
    }
    else {
      seenValues[record[reqColumnName]] = 1;
    }
  }
  res.send(JSON.stringify(seenValues, null, 2));
});

app.get('/Commodity/histogram', (req, res) => {
  let reqCommodity = req.query.v.toLowerCase();
  let matches = 0;
  for (let record of projection2021records) {
    if (reqCommodity === record['Commodity'].toLowerCase()) {
      matches++;
    }
  }
  res.send(`matches = ${matches}`)
})

app.get('/CommodityType/histogram', (req, res) => {
  let reqCommodityType = req.query.v.toLowerCase();
  let matches = 0;
  for (let record of projection2021records) {
    if (reqCommodityType === record['CommodityType'].toLowerCase()) {
      matches++;
    }
  }
  res.send(`matches = ${matches}`)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
