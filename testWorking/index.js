const express = require("express");

const bodyParser = require("body-parser");

const Sequelize = require("sequelize");

const getModels = require("./model.js");

const {Op} = Sequelize;

const {User, Following, sequelize} = getModels()

require("./autocreate.js")(200, User, Following, sequelize)

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  res.status(200).send(await User.findAll());
});

app.get("/max-following", async (req, res) => {
  console.log("User ==>", User)
  const result = await User.findAll({

    include: { association: 'followTo',attributes: []},
    attributes: [
      "user_id",
      [
        Sequelize.fn("COUNT", Sequelize.col("followTo.user_id_followee")),
        "followed_count",
      ],
    ],
    group: ["user_id"],
    order: [['followed_count', 'DESC']],
    //limit:3,  // Don't work. Fix me. ==> people have the same problem, but this solution with [[]] still don't work with 'include SELECT' https://github.com/sequelize/sequelize/issues/2004 
    })
  res.status(200).send(result.slice(0,5))
});

app.get("/not-following", async (req, res) => {
  res.status(200).send(
    await User.findAll({
    include: { association: 'followTo'},
    where:{
      '$followTo.user_id_followee$': { [Op.eq]: null }
    },
    group: ["user_id"],
    })
  );
});

app.get("/users/:userId/friends", async (req, res) => {
  console.log(req.params["userId"]);
  console.log(req.params["friends"]);
  const url = new URL(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  console.log(
    url.searchParams.get("order_by"),
    url.searchParams.get("order_type").toUpperCase(),
    )
  res.status(200).send(
    await User.findAll({
      order: [
        [
          url.searchParams.get("order_by"),
          url.searchParams.get("order_type").toUpperCase(),
        ],
      ],
    })
  );
});

app.listen(4000, () => {
  console.log("Я встал");
});
