const { Comment, Pizza } = require("../models");

const commentController = {
    // add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
        .then(({_id}) => {
            return Pizza.findByIdAndUpdate(
                {_id: params.pizzaId },
                { $push: { comments: _id } },
                { new: true }
            );
        })
        .then(pizzaData => {
            if (!pizzaData) {
                res.status(404).json({ message: 'No pizza found with this id' });
                return;
            }
            res.json(pizzaData);
        })
        .catch(err => res.json(err));
    },
    // add reply to comment 
    addReply({ params, body }, res) {
        Comment.findByIdAndUpdate(
            { _id: params.commentId },
            { $push: { replies: body } },
            { new: true }
        )
        .then(pizzaData => {
            if (!pizzaData) {
                res.status(404).json({ message: 'No pizza found with this id' });
                return;
            }
            res.json(pizzaData);
        })
        .catch(err => res.json(err));
    },
    // remove reply
    removeReply({ params }, res) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $pull: { replies: { replyId: params.replyId } } },
            { new: true }
        )
        .then(pizzaData => res.json(pizzaData))
        .catch(err => res.json(err));
    },
    // remove comment() 
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
            .then(deletedComment => {
                if (!deletedComment) {
                    return res.status(404).json({ message: 'No comment found with this id' });
                }
                return Pizza.findByIdAndUpdate(
                    { id: params.pizzaId },
                    { $pull: { comments: params.commentId } },
                    { new: true }
                );
            })
            .then(pizzaData => {
                if (!pizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id' });
                    return;
                }
                res.json(pizzaData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = commentController;