require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

// Routes
app.use('/api/commentaires', require('./routes/commentaires'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Database sync and server start
(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('✅ Database connection established');

        // Sync models without forcing
        await db.sequelize.sync({ alter: true });
        console.log('✅ Database synced');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Startup failed:', error);
        process.exit(1);
    }
})();