const { Recette, Utilisateur, Commentaire, Ingredient, Categorie, Tag } = require('../models');

exports.getAllRecettes = async (req, res) => {
    try {
        const recettes = await Recette.findAll({
            include: [Utilisateur, Commentaire, Ingredient, Categorie, Tag]
        });
        res.json(recettes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des recettes', error });
    }
};

exports.getRecetteById = async (req, res) => {
    const { id } = req.params;
    try {
        const recette = await Recette.findByPk(id, {
            include: [Utilisateur, Commentaire, Ingredient, Categorie, Tag]
        });
        if (!recette) {
            return res.status(404).json({ message: 'Recette non trouvée' });
        }
        res.json(recette);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la recette', error });
    }
};

exports.createRecette = async (req, res) => {
    const { titre, description, tempsPreparation, tempsCuisson, niveauDifficulte, utilisateurId } = req.body;
    try {
        console.log('Creating recette:', req.body);

        const nouvelleRecette = await Recette.create({
            titre,
            description,
            tempsPreparation,
            tempsCuisson,
            niveauDifficulte,
            utilisateurId
        });

        console.log('Recette created:', nouvelleRecette); // Log de la recette créée

        res.status(201).json(nouvelleRecette);
    } catch (error) {
        console.error('Error creating recette:', error); // Log des erreurs
        res.status(400).json({ message: 'Erreur lors de la création de la recette', error });
    }
};



exports.updateRecette = async (req, res) => {
    const { id } = req.params;
    try {
        const recette = await Recette.findByPk(id);
        if (!recette) {
            return res.status(404).json({ message: 'Recette non trouvée' });
        }

        await recette.update(req.body);
        res.json(recette);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour', error });
    }
};

exports.deleteRecette = async (req, res) => {
    const { id } = req.params;
    try {
        const recette = await Recette.findByPk(id);
        if (!recette) {
            return res.status(404).json({ message: 'Recette non trouvée' });
        }

        await recette.destroy();
        res.json({ message: 'Recette supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression', error });
    }
};