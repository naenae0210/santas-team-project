const mysql = require('../models/index'),
    Mountain = mysql.Mountain,
    sequelize = require("sequelize"),
    Op = sequelize.Op;

exports.cntMountains = async (req, res) => {
    try {
        data = await Mountain.findAll();
        console.log(data);
        res.render("mountain", {mountains: data});
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
    }).then(result => {
        res.json(result)
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
    }).then(result => {
        res.json(result)
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}