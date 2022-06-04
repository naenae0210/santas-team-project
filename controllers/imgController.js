const request = require("request");

const key = 'uztp5PFDDh%2BCHj3iQ8dpL9e5QQM3Dn3mIfzDaVG24UwPSyxzuDw3XB9pj6m6mh1DGfT3QuoU5HcE07vLuPPGdw%3D%3D';

const add1 = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoImgOpenAPI?mntiListNo='
    add2 = '&ServiceKey=',
    add3 = '&_type=json';

exports.getImage = async (req, res) => {
    const address = add1 + req.params.number + add2 + key + add3;

    request.get(address, (err, res, body) => {
        const json = JSON.parse(body);

        let image = json.response.body.items.item.imgfilename;

        if (!Array.isArray(image)) {
            image = new Array(image);
        }

        console.log(image);

        return "www.forest.go.kr/images/data/down/mountain/" + image[0];
    })
};