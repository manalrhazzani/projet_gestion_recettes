const db = require('../models');
const { Op } = require('sequelize');

// Helper function for error handling
const handleError = (res, error, status = 500) => {
    console.error('Error:', error);
    const errorMap = {
        'SequelizeValidationError': { status: 400, message: 'Validation error' },
        'SequelizeForeignKeyConstraintError': { status: 400, message: 'Associated user or recipe not found' },
        'default': { status: 500, message: 'Internal server error' }
    };

    const errorType = errorMap[error.name] || errorMap.default;
    const response = {
        error: errorType.message,
        details: process.env.NODE_ENV === 'development' ? {
            message: error.message,
            stack: error.stack
        } : undefined
    };

    // Add validation errors if present
    if (error.errors) {
        response.validationErrors = error.errors.map(err => ({
            field: err.path,
            message: err.message
        }));
    }

    res.status(errorType.status).json(response);
};

// Create a new comment
exports.createCommentaire = async (req, res) => {
    try {
        const { contenu, utilisateurId, recetteId } = req.body;

        // Basic validation
        if (!contenu || !utilisateurId || !recetteId) {
            return res.status(400).json({
                error: 'Content, user ID and recipe ID are required',
                requiredFields: ['contenu', 'utilisateurId', 'recetteId']
            });
        }

        const newComment = await db.Commentaire.create({
            contenu,
            utilisateurId,
            recetteId,
            date: new Date()
        });

        // Fetch the created comment with associations
        const createdComment = await db.Commentaire.findByPk(newComment.id, {
            include: [
                { model: db.Utilisateur, as: 'utilisateur', attributes: ['id', 'nom'] },
                { model: db.Recette, as: 'recette', attributes: ['id', 'titre'] }
            ]
        });

        res.status(201).json(createdComment);
    } catch (error) {
        handleError(res, error);
    }
};

// Get all comments
exports.getAllCommentaires = async (req, res) => {
    try {
        const comments = await db.Commentaire.findAll({
            include: [
                { model: db.Utilisateur, as: 'utilisateur', attributes: ['id', 'nom'] },
                { model: db.Recette, as: 'recette', attributes: ['id', 'titre'] }
            ],
            order: [['date', 'DESC']]
        });

        res.json(comments);
    } catch (error) {
        handleError(res, error);
    }
};

// Get comments for a specific recipe
exports.getCommentairesByRecette = async (req, res) => {
    try {
        const comments = await db.Commentaire.findAll({
            where: { recetteId: req.params.recetteId },
            include: [
                { model: db.Utilisateur, as: 'utilisateur', attributes: ['id', 'nom'] }
            ],
            order: [['date', 'DESC']]
        });

        if (!comments.length) {
            return res.status(404).json({
                message: 'No comments found for this recipe',
                recetteId: req.params.recetteId
            });
        }

        res.json(comments);
    } catch (error) {
        handleError(res, error);
    }
};

// Get a single comment by ID
exports.getCommentaireById = async (req, res) => {
    try {
        const comment = await db.Commentaire.findByPk(req.params.id, {
            include: [
                { model: db.Utilisateur, as: 'utilisateur', attributes: ['id', 'nom'] },
                { model: db.Recette, as: 'recette', attributes: ['id', 'titre'] }
            ]
        });

        if (!comment) {
            return res.status(404).json({
                error: 'Comment not found',
                commentId: req.params.id
            });
        }

        res.json(comment);
    } catch (error) {
        handleError(res, error);
    }
};

// Update a comment
exports.updateCommentaire = async (req, res) => {
    try {
        const { contenu } = req.body;

        if (!contenu) {
            return res.status(400).json({
                error: 'Content is required for update',
                field: 'contenu'
            });
        }

        const [updatedRows] = await db.Commentaire.update(
            { contenu },
            { where: { id: req.params.id } }
        );

        if (updatedRows === 0) {
            return res.status(404).json({
                error: 'Comment not found or no changes made',
                commentId: req.params.id
            });
        }

        const updatedComment = await db.Commentaire.findByPk(req.params.id);
        res.json(updatedComment);
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a comment
exports.deleteCommentaire = async (req, res) => {
    try {
        const deletedRows = await db.Commentaire.destroy({
            where: { id: req.params.id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({
                error: 'Comment not found',
                commentId: req.params.id
            });
        }

        res.status(204).end();
    } catch (error) {
        handleError(res, error);
    }
};