const express = require('express');
const router = express.Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

router.get('/', getThoughts);
router.post('/', createThought);

router.get('/:thoughtId', getSingleThought);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', deleteThought);

router.post('/:thoughtId/reactions', addReaction);
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;