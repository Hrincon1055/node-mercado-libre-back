const { request, response } = require("express");
const { author } = require("../utils/constants");
const axios = require("axios");
const getProduts = async (req = request, res = response) => {
  const { q = "", limit = 20 } = req.query;
  console.log("produts LINE 6 =>", limit);
  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${q}&limit=${limit}`
    );
    const categories = response.data.filters[0]["values"][0][
      "path_from_root"
    ].map((category) => {
      return category.name;
    });
    const items = response.data.results.map((item) => {
      return {
        id: item.id,
        title: item.title,
        price: {
          currency: item.prices.prices[0]["currency_id"],
          amount: item.prices.prices[0]["amount"],
          decimals: item.prices.prices[0]["amount"],
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      };
    });
    return res.status(200).json({
      susecces: true,
      author,
      categories,
      items,
    });
  } catch (error) {
    return res.status(500).json({
      susecces: false,
      msg: "Ha ocurrido un error.",
    });
  }
};
const getProdutById = async (req = request, res = response) => {
  const { id = "" } = req.params;
  try {
    // const item = await axios.get(`https://api.mercadolibre.com/items/${id}`);
    // const description = await axios.get(
    //   `https://api.mercadolibre.com/items/${id}/description`
    // );
    const [item, description] = await Promise.all([
      axios.get(`https://api.mercadolibre.com/items/${id}`),
      axios.get(`https://api.mercadolibre.com/items/${id}/description`),
    ]);
    console.log("produts LINE 54 =>", description);
    return res.status(200).json({
      susecces: true,
      author,
      item: {
        id: item.data.id,
        title: item.data.title,
        price: {
          currency: item.data.currency_id,
          amount: item.data.price,
          decimals: item.data.price,
        },
        picture: item.data.pictures[0]["url"],
        condition: item.data.condition,
        free_shipping: item.data.shipping.free_shipping,
        sold_quantity: item.data.sold_quantity,
        description: description.data.plain_text,
      },
    });
  } catch (error) {
    if (error.response.status === 404) {
      return res.status(404).json({
        susecces: false,
        msg: `Item with id ${id} not found`,
      });
    } else {
      return res.status(500).json({
        susecces: false,
        msg: "Ha ocurrido un error!!!.",
      });
    }
  }
};

module.exports = {
  getProduts,
  getProdutById,
};
