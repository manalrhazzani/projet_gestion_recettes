module.exports = (sequelize, DataTypes) => {
    const Utilisateur = sequelize.define('Utilisateur', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        motDePasse: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Utilisateur.associate = (models) => {
        Utilisateur.hasMany(models.Recette, { foreignKey: 'utilisateurId' });
        Utilisateur.hasMany(models.Commentaire, { foreignKey: 'utilisateurId' });
    };

    return Utilisateur;
};
