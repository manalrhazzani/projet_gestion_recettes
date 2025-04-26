module.exports = (sequelize, DataTypes) => {
    const Commentaire = sequelize.define('Commentaire', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        contenu: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Le contenu ne peut pas être vide'
                },
                len: {
                    args: [1, 1000],
                    msg: 'Le commentaire doit contenir entre 1 et 1000 caractères'
                }
            }
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            validate: {
                isDate: true
            }
        },
        utilisateurId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        recetteId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'Commentaires',
        timestamps: true,
        indexes: [
            {
                fields: ['utilisateurId']
            },
            {
                fields: ['recetteId']
            }
        ]
    });

    Commentaire.associate = function(models) {
        Commentaire.belongsTo(models.Utilisateur, {
            foreignKey: 'utilisateurId',
            as: 'utilisateur'
        });
        Commentaire.belongsTo(models.Recette, {
            foreignKey: 'recetteId',
            as: 'recette'
        });
    };

    return Commentaire;
};