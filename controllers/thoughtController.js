const { Thought, User } = require('../models');

const sendErrorResponse = (err, res) => {
  console.log(err);
  res.status(500).json(err);
};

const thoughtController = {
  async getThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find().sort({ createdAt: -1 });
      res.json(dbThoughtData);
    } catch (err) {
      sendErrorResponse(err, res);
    }
  },

  async getSingleThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(dbThoughtData);
    } catch (err) {
      sendErrorResponse(err, res);
    }
  },

  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought created but no user with this id!' });
      }

      res.json({ message: 'Thought successfully created!' });
    } catch (err) {
      sendErrorResponse(err, res);
    }
  },

  async updateThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(dbThoughtData);
    } catch (err) {
      sendErrorResponse(err, res);
    }
  },

  async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const dbUserData = User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought created but no user with this id!' });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      sendErrorResponse(err, res);
    }
  },

  async addReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(dbThoughtData);
    } catch (err) {
      sendErrorResponse(err, res);
    }
  },

  async removeReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(dbThoughtData);
    } catch (err) {
      sendErrorResponse(err, res);
    }
  },
};

module.exports = thoughtController;
