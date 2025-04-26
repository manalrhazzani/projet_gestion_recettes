module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define('Ingredient', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantite: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Ingredient.associate = (models) => {
        Ingredient.belongsToMany(models.Recette, { through: 'RecetteIngredient', foreignKey: 'ingredientId' });
    };

    return Ingredient;
};
