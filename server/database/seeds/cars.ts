import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        { car_name: "Mitsubishi Lancer Evo X 2017", price: "1000000", image: null, start_rent: "2023-11-03", finish_rent: "2024-01-01"},
        { car_name: "Chevrolet Corvette ZR1 2019", price: "3000000", image: null, start_rent: "2023-10-13", finish_rent: "2023-11-01"},
        { car_name: "Audi R8 V8 2018", price: "5000000", image: null, start_rent: "2023-11-27", finish_rent: "2024-02-01"}
    ]);
};
