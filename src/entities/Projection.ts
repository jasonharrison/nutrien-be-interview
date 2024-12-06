import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Projection extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  attribute!: string;

  @Property()
  commodity!: string;

  @Property()
  commodityType!: string;

  @Property()
  units!: string;

  @Property()
  yearType!: string;

  @Property()
  year!: string;

  @Property()
  value!: number;
}