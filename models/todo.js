const Sequelize = require("sequelize");

module.exports = class Todo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        contents: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        check: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        color: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Todo",
        tableName: "todos",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    db.Todo.belongsTo(db.User, {
      foreignKey: { name: "commenter", allowNull: false },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
};
