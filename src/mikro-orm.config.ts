
import { EntityCaseNamingStrategy } from '@mikro-orm/better-sqlite';
import { PostgreSqlDriver, Options as PostgreOptions } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SeedManager } from '@mikro-orm/seeder';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

// implement custom naming strategy so to use unchanged entity and property names
// if not for this, MikroORM would convert camelCase to snake_case 
class CustomNamingStrategy extends EntityCaseNamingStrategy {
  override columnNameToProperty(columnName: string): string {
    return columnName;
  }
}


const config: PostgreOptions = {
  driver: PostgreSqlDriver,
  host: process.env.RDS_HOSTNAME,
  port: Number(process.env.RDS_PORT),
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  dbName: process.env.RDS_DB_NAME,
  // folder-based discovery setup, using common filename suffix
  entities: ['./dist/entities/*.js'],
  entitiesTs: ['./src/entities/*.ts'],
  metadataProvider: TsMorphMetadataProvider,
  // enable debug / verbose mode to log SQL queries and discovery information
  debug: true,
  verbose: true,
  highlighter: new SqlHighlighter(),
  extensions: [SeedManager],
  seeder: {
    path: 'dist/seeders',
    pathTs: 'src/seeders',
  },
  namingStrategy: CustomNamingStrategy
};

export default config;