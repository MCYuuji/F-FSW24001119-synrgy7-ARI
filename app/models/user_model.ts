import { Model, ModelObject } from 'objection';
import ObjectionVisibility from 'objection-visibility'

export class UsersModel extends ObjectionVisibility(Model) {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  profile_img!: string;
  role!: string;
  created_by!: string;
  updated_by!: string;
  created_at!: string;
  updated_at!: string;
  
  static hidden = ["password"]
  static get tableName() {
    return 'users'
  }
}

export type users = ModelObject<UsersModel>