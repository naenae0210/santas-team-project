const db = require("../models/index"),
    Comment = db.comment,
    comment = db.comment,
    Post = db.post,
    post = db.post,

    getCommentParams = body => {
        return {
            commentNum: commentNum,
            postId: body.id,
            commentDetail: body.commentDetail,
        };
    };

module.exports = {
    create: async (req, res, next) => {
        let postId = req.params.id;
        let commentParams = getCommentParams(req.body);
        try {
            let comment = await Comment.create(commentParams);
            console.log(comment);
            res.json(comment);
            res.locals.redirect = `/posts/${postId}`;
            res.locals.comments = comments;
            next();
        } catch (error) {
            console.log(`Error saving comment: ${error.messgae}`);
            next(error);
        };
    },

    getComment: async (req, res, next) => {
        try {
            const post = Post.findOne({});
            const comment = await post.getComment();
            console.log(comment);
            next();

        } catch {
            console.log(`Error finding comment: ${error.messgae}`);
            next(error);
        }
    },

    update: async (req, res, next) => {
        let postId = req.params.id;
        try {
            let comment = await Comment.update({
                commentDeatail: req.body.commentDeatil
            }, {
                where: {
                    postId: req.params.id
                }
            });
            res.json(comment);
            res.locals.redirect = `/posts/${postId}`;
            res.locals.comments = comments;
            next();

        } catch {
            console.log(`Error updating comment : ${error.messgae}`);
            next();
        }
    },

    delete: async (req, res, next) => {
        let postId = req.params.id;
        try {
            let comment = await Comment.destroy({
                where: {
                    postId: req.params.id
                }
            });
            res.json(comment);
            next();
        } catch (error) {
            console.log(`Error deleting comment: ${error.messgae}`);
            next();
        };
    },
};
