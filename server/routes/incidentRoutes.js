const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');
const authMiddleware = require('../middleware/auth');

// Get all incidents (or filtered by user)
router.get('/', authMiddleware, incidentController.getIncidents);

// Create a new incident report
router.post('/', authMiddleware, incidentController.createIncident);

// Get incident analytics statistics
router.get('/stats', authMiddleware, incidentController.getStats);

// Update incident status (for verification & status tracking)
router.put('/:id/status', authMiddleware, incidentController.updateIncidentStatus);

module.exports = router;
