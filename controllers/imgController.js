const request = require("request");

const key = 'uztp5PFDDh%2BCHj3iQ8dpL9e5QQM3Dn3mIfzDaVG24UwPSyxzuDw3XB9pj6m6mh1DGfT3QuoU5HcE07vLuPPGdw%3D%3D';

const add1 = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoImgOpenAPI?mntiListNo='
    add2 = 'ServiceKey=',
    add3 = '<response>&_type=json';

exports.getImage = async (req, res) => {

    const address = add1 + req.params.number + add2 + key + add3;

    request.get(address, (error, resp, body) => {
        console.log(body);
        const json = JSON.parse(body);

        let image = json.response.body.items.item;

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