module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Tag.associate = (models) => {
        Tag.belongsToMany(models.Recette, { through: 'RecetteTag', foreignKey: 'tagId' });
    };

    return Tag;
};
