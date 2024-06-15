import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
        table.increments("id").primary()
        table.string("car_name", 255).notNullable()
        table.float('price').notNullable().defaultTo(0)
        table.text('image')
        table.date('start_rent').notNullable().defaultTo('2024-01-01')
        table.date('finish_rent').notNullable().defaultTo('2024-01-01')
        
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars")
}

