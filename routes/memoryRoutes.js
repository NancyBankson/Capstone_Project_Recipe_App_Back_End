const router = require('express').Router();
const { authMiddleware } = require('../utils/auth');
const memoryController = require('../controllers/memoryController');

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

router.get('/', memoryController.findMemories);
router.post('/', memoryController.createMemory);
router.put('/:id', memoryController.editMemory);
router.delete('/:id', memoryController.deleteMemory);
router.get('/:id', memoryController.findOneMemory);

module.exports = router;