const { Categorie } = require('../models');

exports.getAllCategories = async (req, res) => {
    try {
        console.log(Categorie); // Should show the model function
        const categories = await Categorie.findAll({
            attributes: ['id', 'nom','description'],
            order: [['nom', 'ASC']]
        });
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get single category
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Categories.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create new category
exports.createCategory = async (req, res) => {
    try {
        const { nom } = req.body;

        if (!nom) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const newCategory = await Categories.create({ nom });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update category
exports.updateCategory = async (req, res) => {
    try {
        const { nom } = req.body;
        const category = await Categories.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        category.nom = nom || category.name;
        await category.save();

        res.json(category);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Categories.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await category.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting category:', error);

        if (error.nom === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({
                error: 'Cannot delete category as it is associated with recipes'
            });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
};