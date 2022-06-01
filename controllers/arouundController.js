const mysql = require('../models/index'),
    Around = mysql.Around,
    Mountain = mysql.Mountain;

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
                    address: {
                        [Op.like]: "%" + searchWord + "%"
                    }
                }
            }
        ]
    }).then((aroundList) => {
        res.render('/around', aroundList);
        res.redirect("/around/" + searchWord);
    })
}

exports.allAround = async (req, res) => {
    const aroundList = await Around.findAll();
    res.render('/around', aroundList);
    
}