const mysql = require('../models/index'),
    Around = mysql.Around,
    Mountain = mysql.Mountain,
    sequelize = require("sequelize"),
    Op = sequelize.Op;

exports.searchAroundByName = async (req, res) => {
    const searchWord = req.body.searchWord;
    
    Around.findAll({
        include: [
            {
                model: Mountain,
                required: true,
                attributes: ['number', 'name', 'address'],
                through: {
                    attributes: ['mountainNum', 'number']
                },
                where: {
                    name: {
                        [Op.like]: "%" + searchWord + "%"
                    }
                }
            }
        ]
    }).then((aroundList) => {
        res.render('/around', {arounds: aroundList});
    })
}

exports.allAround = async (req, res) => {
    Mountain.findAll().then(aroundList => {
        res.render('around', {arounds : aroundList});
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
};