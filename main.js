const request = require("request");
const cheerio = require("cheerio");
const url = "https://github.com/topics";
const getReposPageHtml = require("./reposPage");
request(url,cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    }else if(response.statusCode == 404){
        console.log("page not found");
    }
    else{
        extractHtml(html);
    }
}
function extractHtml(html){
    let $ = cheerio.load(html);
    let top3Arr = $(".col-12.col-sm-6.col-md-4.mb-4 .f3");
    let linkArr = $(".col-12.col-sm-6.col-md-4.mb-4 a");
    for(let i=0;i<top3Arr.length;i++){
        let topic = $(top3Arr[i]).text().trim();
        let href = $(linkArr[i]).attr("href");
        href = "https://github.com" + href;
        console.log(`${topic} : ${href}`);
        getReposPageHtml(href,topic);
    }
}

