const request = require("request"),
    parseString = require('xml2js').parseString;


const key = 'JsYDcymAO%2BdqZ2KscehCHVe%2B83DUZExkHQdWA5S1eVJaBHVHjkaHVELfhZ3xX5pGknpwTb6wRVIg4fbsQOV%2Fnw%3D%3D';

const add1 = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoImgOpenAPI?mntiListNo='
    add2 = '&ServiceKey=',
    add3 = '<response>&_type=json';

exports.getImage = async (req, res) => {

    const address = add1 + req.params.number + add2 + key + add3;

    request.get(address, async (error, resp, body) => {
        let parsedData;

        parseString(body, function (err, result) {
            parsedData = result;
        })
        
        const json = await JSON.parse(parsedData);

        let image = json.reponse.body.items.item;

        if (!Array.isArray(image)) {
            image = new Array(image);
        }

        if (image[0] != undefined) {
            res.redirect("https://www.forest.go.kr/images/data/down/mountain/" + image[0]['imgfilename']);
        }
        else {
            res.redirect("../../images/noimage.png");
        }
    })
};

exports.getImages = async (req, res) => {
    const address = add1 + req.params.number + add2 + key + add3;
    const imgNum = req.params.imgNum;

    request.get(address, (error, resp, body) => {
        const json = JSON.parse(body);

        let image = json.response.body.items.item;

        if (!Array.isArray(image)) {
            image = new Array(image);
        }

        if (image[0] != undefined && image[imgNum] != null) {
            res.redirect("https://www.forest.go.kr/images/data/down/mountain/" + image[imgNum]['imgfilename']);
        }
        else {
            res.redirect("../../images/noimage.png");
        }
    })
}