import express from 'express';

import { MikroORM } from '@mikro-orm/postgresql';
import config from './mikro-orm.config.js';
import { Projection } from './entities/Projection.js';

const PORT = 3123;

const app = express();
const orm = await MikroORM.init(config);

const ALLOWED_COLUMNS = ['attribute', 'commodity', 'commodityType', 'units', 'yearType', 'year'];

// Health check for the Docker container
app.get("/healthz", async (_req, res) => {
  res.send("OK");
});

// Retrieve counts by column name
app.get("/:columnName", async (req, res) => {
  const columnName = req.params.columnName;
  if (!ALLOWED_COLUMNS.includes(columnName)) {
    res.sendStatus(404);
    return;
  }

  const em = orm.em.fork();
  const knex = em.getKnex();

  // This query is safe from SQL injection attacks because we're using a whitelist of allowed column names.
  // The `columnName` parameter is validated against the `ALLOWED_COLUMNS` array before being used in the query.
  // This prevents an attacker from injecting malicious SQL code by manipulating the `columnName` parameter.
  const qb = knex(orm.getMetadata(Projection).tableName)
    .select(columnName)
    .count(`${columnName} as count`)
    .groupBy(columnName);
  const result = await em.execute(qb);

  const columnValueCounts = result.reduce((acc, row) => {
    acc[row[columnName]] = Number(row.count);
    return acc;
  }, {});

  res.json(columnValueCounts);
});

// Retrieve value counts by column name and value
app.get("/:columnName/:value", async (req, res) => {
  const columnName = req.params.columnName;
  if (!ALLOWED_COLUMNS.includes(columnName)) {
    res.sendStatus(404);
    return;
  }
  const value = req.params.value;
  const em = orm.em.fork();

  const count = await em.count(Projection, {
    [columnName]: value
  });
  res.json({ count });
});

// send formatted JSON for readability
app.set('json spaces', 2); 

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

