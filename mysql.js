require('dotenv').config();
const mysql = require('mysql2/promise');
let db;

let test = async () => {
	db = mysql.createPool({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PW,
		port: process.env.DB_PORT,
		database: process.env.DB_NAME,
		waitForConnections: true,
		insecureAuth: true
	});
	/*
	let sql = 'SELECT * FROM around';
	let [rows, fields] = await db.query(sql);
	console.log(rows);
	*/
};
test();

// api test
const request = require("request");

const key = 'uztp5PFDDh%2BCHj3iQ8dpL9e5QQM3Dn3mIfzDaVG24UwPSyxzuDw3XB9pj6m6mh1DGfT3QuoU5HcE07vLuPPGdw%3D%3D';

const add1 = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoOpenAPI?searchWrd='
    add2 = '&ServiceKey=',
    add3 = '&numOfRows=10&pageNo=1&examdate=2017-12-27&_type=json';

let reqUrl = add1 + encodeURI('설악') + add2 + key + add3;

request.get(reqUrl, (err, res, body) => {
	if (err) {
		console.log(`err => ${err}`);
	}
	else {
		if (res.statusCode == 200) {
			const json = JSON.parse(body);

			let mountain = json.response.body.items.item;

				console.log(mountain);
				mountain.forEach(async (data) => {
					const [check, results] = await db.query(
						`SELECT count(*) FROM mountains where name = "${data.mntiname}"`);
						
						console.log(check);
						if (check[0]['count(*)'] == 0) {
							const [rows, fields] = await db.query(
								`INSERT INTO mountains(number, name, address, altitude, distance, difficulty, cableCar, landscape) VALUES(?, ?, ?, ?, NULL, NULL, NULL, NULL)`,
								[
									data.mntilistno,
									data.mntiname,
									data.mntiadd,
									1708
								]
							);
							console.log(rows);
						}
						else {
							console.log('same data already in db');
						}
					}
				)
					}
					}
				}
			);


			/*
			mountain.forEach((data) => {
				db.query(
					`SELECT count(*) FROM mountains where name = "${data.mntiname}"`,
					async (err, results) => {

						if (results[0]['count(*)'] == 0) {
							await db.query(
								`INSERT INTO mountains(number, name, address, altitude) VALUES(?, ?, ?, ?)`,
								[
									data.mntilistno,
									data.mntiname,
									data.mntiadd,
									data.mntihigh
								],
								async (err, results) => {
									console.log('result: ', results);
								}
							);
						} else {
							console.log('same data already in db');
						}
					}
				)
			}); */
		