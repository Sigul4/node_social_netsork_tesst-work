const Sequelize = require("sequelize");
const howMany = require("./helpers.js");
const mysql = require("mysql2");

const sequelize = new Sequelize("testWork", "root", "314314314", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  logging: console.log,
  define: {
    timestamps: false,
  },
});

module.exports = function getModels(){

    class User extends Sequelize.Model {}

    User.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        first_name: Sequelize.STRING,
      },
      { sequelize, modelName: "users" }
    );
    
    class Following extends Sequelize.Model {}
    
    Following.init(
      {
        _id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          allowNull: false,
          required: true,
          references: {
            model: "users",
            key: "user_id",
          },
        },
        user_id_followee: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          allowNull: false,
          required: true,
          references: {
            model: "users",
            key: "user_id",
          },
        },
      },
      {
        sequelize,
        modelName: "followings",
        indexes: [
          {
            unique: true,
            fields: ["user_id", "user_id_followee"],
          },
        ],
        hooks: {
          beforeValidate: async ({ user_id }) => {
            const result = await howMany(Following, user_id);
            //+1 because we don't create it yet
            if (result + 1 > 150) {
              throw new Error(`U CAN'T ADD MORE THAN 150 FOLLOWINGS`);
            }
          },
        },
      }
    );
    
    User.hasMany(Following, {
      as: 'followTo',
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    
    Following.belongsTo(User, {
      foreignKey: "user_id",
      sourceKey: "user_id",
    });
    
    console.log('User',User, )

    return {User, Following, sequelize}
}


