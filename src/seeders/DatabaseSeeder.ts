import fs from "fs";
import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Projection } from "../entities/Projection.js";
import Papa from 'papaparse';

const P2021_CSV_FILE = 'seed_data/Projection2021.csv';

const p2021data = fs.readFileSync(P2021_CSV_FILE).toString();
const parsed = Papa.parse<any>(p2021data, { header: true, skipEmptyLines: true });
const p2021records = parsed.data;

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    console.log(`Seeding database with ${P2021_CSV_FILE}`);
    for (let record of p2021records) {
      em.create(Projection, {
        attribute: record.Attribute,
        commodity: record.Commodity,
        commodityType: record.CommodityType,
        units: record.Units,
        yearType: record.YearType,
        year: record.Year,
        value: Number(record.Value),
      });
    }
  }
}