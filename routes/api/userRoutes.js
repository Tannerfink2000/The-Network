const express = require('express');
const userController = require('../../controllers/user-controller');
const router = express.Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);

router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

router.post('/:userId/friends/:friendId', userController.addFriend);
router.delete('/:userId/friends/:friendId', userController.removeFriend);

module.exports = router;
