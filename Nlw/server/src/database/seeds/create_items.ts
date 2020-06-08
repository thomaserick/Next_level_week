import Knex from "knex";
export async function seed(knex: Knex) {
  await knex("items").insert([
    {
      title: "Lâmpadas",
      image: "lampadas.svg",
    },
    {
      title: "Pilhas",
      image: "baterias.svg",
    },
    {
      title: "Papéis",
      image: "papeis-papelao.svg",
    },
    {
      title: "Resíduos Eletrônicos",
      image: "eletronicos.svg",
    },
    {
      title: "Resíduo Orgnânicos",
      image: "organicos.svg",
    },
    {
      title: "Óleo de Cozinha",
      image: "oleo.svg",
    },
  ]);
}
