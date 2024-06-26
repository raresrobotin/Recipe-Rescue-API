var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/recipes.json";

/**
 *
 */
router.get("/", function (req, res, next) {
  console.log("reading file %o", DATA_PATH);
  const recipes = getRecipes();
  res.json(recipes);
});

/**
 *
 */
router.post("/create", function (req, res, next) {
  const name = req.body.name;
  const type = req.body.type;
  const ingredients = req.body.ingredients;
  const instructions = req.body.ingredients;
  const time = req.body.time;
  const image = req.body.image;

  const recipes = getRecipes();
  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  recipes.push({
    id,
    name,
    type,
    ingredients,
    instructions,
    time,
    image
  });

  setRecipes(recipes);

  res.json({ success: true, id });
  res.status(201);
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

  const recipes = getRecipes().filter(recipe => recipe.id != id);

  setRecipes(recipes);

  res.json({ success: true });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  const id = req.body.id;
  const promotion = req.body.promotion;
  const members = req.body.members;
  const name = req.body.name;
  const url = req.body.url;

  const recipes = getRecipes();

  const team = recipes.find(team => team.id == id);
  if (team) {
    team.promotion = promotion;
    team.members = members;
    team.name = name;
    team.url = url;
  }

  setRecipes(recipes);

  res.json({ success: true });
});

function getRecipes() {
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

function setRecipes(recipes) {
  const content = JSON.stringify(recipes, null, 2);
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = router;
