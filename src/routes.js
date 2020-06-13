const express = require("express");
const crypto = require("crypto");

const connection = require("./database/connection");
const { request, response } = require("express");

const routes = express.Router();

routes.get("/index", async (request, response) => {
  const index = await connection("list").select("*");

  return response.json(index);
});

routes.post("/new", async (request, response) => {
  console.log(request.body);
  const { product, price, quantity, amount } = request.body;

  const id = crypto.randomBytes(4).toString("HEX");

  await connection("list").insert({
    id,
    product,
    price,
    quantity,
    amount,
  });

  return response.json({ id });
});

routes.delete("/delete", async (request, response) => {
  var id = request.body.id;
  if (id) {
    await connection("list")
      .where("id", id)
      .del()
      .then(() => { return response.json()});
  }
});

module.exports = routes;
