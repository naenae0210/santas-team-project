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
    }).catch(error => {
        console.log(`Error deleting bookmark: ${error.message}`);
    });
};

exports.getBookMark = async (req, res) => {
    const userId = req.session.id;

    Bookmark.count({
        where : {
            id: userId,
            mountainNum: req.body.mountainNum
        }
    }
    ).then(c => {
        if (c == 1) {

        }
    })
}

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
        const bookmarks = {
            number: bookmarkList.number,
            name: Mountain.name,
            address: Mountain.address
        }
        res.render('/bookmark', { bookmarks
        });
    })
}