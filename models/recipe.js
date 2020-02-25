module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        url: {
            type: DataTypes.STRING,
            unique: true
        }
    });
    Recipe.associate = function(models) {
        Recipe.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Recipe;
};