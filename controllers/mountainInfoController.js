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
			// res.render('mountainInfo', {mountain : findMountain});
			next(req, res, findMountain);
		}).catch(err => {
			res.status(500).send({
				message: err.message
			});
		})
	}


exports.showAround = async(req, res, mountain) => {
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
		res.render('mountainInfo', {mountain : mountain, arounds: aroundList});
	}).catch(err => {
		res.status(500).send({
			message: err.message
		});
	})
}