import { Model, ModelObject } from 'objection';

export class CarsModel extends Model {
  id!: number;
  car_name!: string;
  price!: number;
  image!: string;
  start_rent!: Date;
  finish_rent!: Date;

  static get tableName() {
    return 'cars'
  }
}

export type cars = ModelObject<CarsModel>