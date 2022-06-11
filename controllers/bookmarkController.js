const mysql = require('../models/index'),
    Bookmark = mysql.Bookmark,
    Mountain = mysql.Mountain,
    session = require('express-session');

exports.create = async (req, res) => {
    const userId = req.user.id;
    
    try {
        const bookmarkParams = {
            id: userId,
            mountainNum: req.params.mountainNum
        }
        const bookmark = await Bookmark.create(bookmarkParams);
        res.locals.bookmarks = bookmark;
        res.render("/mountain");
    } catch(error) {
        console.log(`Error saving bookmark: ${error.message}`);
    };
};

exports.delete = async (req, res) => {
    const userId = req.user.id;

    Bookmark.destroy({
        where : {
            id: userId,
            mountainNum: req.params.mountainNum
        }
    }).then(result => {
        res.redirect("mountain");
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
};

exports.allBookmark = async (req, res) => {
    let userId = req.user.id;


    Bookmark.findAll({
        where: {
            id : userId
        },
        include: [
            {
                model: Mountain,
                as: 'mountain',
                required: true
            }
        ]
    }).then((bookmarkList) => {
        res.render('bookmark', { bookmarks : bookmarkList
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
};

exports.isBookmark = async (req, res) => {
    let userId;
    if (req.isAuthenticated()) {
        userId = req.user.id;

        Bookmark.findAll({
            where: {
                id : userId
            },
            include: [
                {
                    model: Mountain,
                    as: 'mountain',
                    required: true
                }
            ]
        }).then((bookmarkList) => {
            return res.render('mountain', { bookmarks : bookmarkList
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            })
        })

    }
    else {
        return res.render('mountain', { bookmarks: []});
    }
};