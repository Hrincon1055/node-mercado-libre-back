const { Router } = require("express");
const { check } = require("express-validator");
const { getProduts, getProdutById } = require("../controllers/produts");
const router = Router();

// Inicio
router.get("/", getProduts);
router.get("/:id", getProdutById);

module.exports = router;
