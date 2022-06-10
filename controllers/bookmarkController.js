const mysql = require('../models/index'),
    Bookmark = mysql.Bookmark,
    Mountain = mysql.Mountain,
    session = require('express-session');

exports.create = async (req, res) => {
    const userId = req.session.id;
    
    try {
        const bookmarkParams = {
            id: userId,
            mountainNum: req.body.mountainNum
        }
        const bookmark = await Bookmark.create(bookmarkParams);
        res.locals.redirect = "/mountain";
        res.locals.bookmark = bookmark;
    } catch(error) {
        console.log(`Error saving bookmark: ${error.message}`);
    };
};

exports.delete = async (req, res) => {
    const userId = req.session.id;

    Bookmark.destroy({
        where : {
            id: userId,
            mountainNum: req.body.mountainNum
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
    const userId = req.session.id;

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
}

exports.markBookmark = async (req, res) => {
    const userId = req.session.id;
    
    Bookmark.findAll({
        where: {
            id : userId
        }
    }).then((bookmarkList) => {
        req.render("mountain", {bookmarks: bookmarkList})
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}