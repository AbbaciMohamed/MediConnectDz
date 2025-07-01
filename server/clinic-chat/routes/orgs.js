const express = require('express');
const router = express.Router();
const Organization = require('../models/Organization');

// Get all orgs
router.get('/', async (req, res) => res.json(await Organization.find()));
// Create org
router.post('/', async (req, res) => res.json(await Organization.create(req.body)));
// Get org by id
router.get('/:id', async (req, res) => res.json(await Organization.findById(req.params.id)));
// Update org
router.put('/:id', async (req, res) => res.json(await Organization.findByIdAndUpdate(req.params.id, req.body, { new: true })));
// Delete org
router.delete('/:id', async (req, res) => res.json(await Organization.findByIdAndDelete(req.params.id)));

module.exports = router; 