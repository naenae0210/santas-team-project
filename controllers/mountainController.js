const mysql = require('../models/index'),
    Mountain = mysql.Mountain,
    sequelize = require("sequelize"),
    Op = sequelize.Op;

exports.allMountain = async (req, res) => {
    try {
        const mountains = await Mountain.findAll();
        console.log(mountains);
        res.render('mountain', {mountains});
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

exports.getMountainParams = body => {
    return {
        number: body.number,
        name: body.name,
        address: body.address,
        difficulty: body.difficulty
    }
}

exports.searchMountainByAdd = async(req, res) => {
    const searchWord = req.params.searchWord;

    Mountain.findAll({
        where: {
            address: {
                [Op.like]: "%" + searchWord + "%"
            }
        }
    }).then(mountainList => {
        res.render('/mountain', {mountains : mountainList});
        res.redirect("/mountain/" + searchWord);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

exports.searchMountainByDifficulty = async (req, res) => {
    const searchWord = req.params.searchWord;

    Mountain.findAll({
        where: {
            difficulty: searchWord
        }
    }).then(mountainList => {
        res.render('/mountain', {mountains : mountainList});
        res.redirect("/mountain/difficulty/" + searchWord);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}