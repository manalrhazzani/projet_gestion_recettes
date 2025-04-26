const express = require('express');
const router = express.Router();
const controller = require('../controllers/commentairesController');

router.post('/', controller.createCommentaire);
router.get('/', controller.getAllCommentaires);
router.get('/recette/:recetteId', controller.getCommentairesByRecette);
router.get('/:id', controller.getCommentaireById);
router.put('/:id', controller.updateCommentaire);
router.delete('/:id', controller.deleteCommentaire);

module.exports = router;