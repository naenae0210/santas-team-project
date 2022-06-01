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
    }).then((result) => {
        res.json(result);
        res.redirect("around");
    })
}