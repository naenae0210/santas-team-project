const mysql = require('../models/index'),
    Mountain = mysql.Mountain,
    sequelize = require("sequelize"),
    Op = sequelize.Op;

exports.cntMountains = async (req, res) => {
    try {
        data = await Mountain.findAll();
        console.log(data);
        res.render("/mountain", {mountains: data});
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

exports.allMountain = async (req, res) => {
    const mountainList = await Mountain.findAll();
    res.render('/mountain', mountainList);
}

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
        res.render('/mountain', mountainList);
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
        res.render('/mountain', mountainList);
        res.redirect("/mountain/" + searchWord);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}