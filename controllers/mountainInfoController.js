const mysql = require("../models/index"),
    Mountain = mysql.Mountain,
    Around = mysql.Around;

	exports.showMountainInfo = async(req, res, next) => {
		const mountainNum = req.params.number;
		console.log(mountainNum);
	
		Mountain.findOne({
			where: {
				number: mountainNum
			}
		}).then(findMountain => {
			res.render('mountainInfo', {mountain : findMountain});
		}).catch(err => {
			res.status(500).send({
				message: err.message
			});
		})
		next();
	}


exports.showAround = async(req, res) => {
	const mountainNum = req.params.number;

	Around.findAll({
		where: {
			mountainNum: mountainNum
		},
		include: [
			{
				model: Mountain,
				as: 'mountain',
				required: true
			}
		]
	}).then((aroundList) => {
		res.render('mountainInfo', {arounds: aroundList});
	}).catch(err => {
		res.status(500).send({
			message: err.message
		});
	})
}