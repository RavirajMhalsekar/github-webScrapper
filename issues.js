const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");
function getIssuesPageHtml(url,topic,repoName){
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }else if(response.statusCode == 404){
            console.log("page not found");
        }
        else{
            extractIssues(html);
        }
    }
    function extractIssues(html){
        let $ = cheerio.load(html);
        let issueElemArr = $(".js-navigation-container.js-active-navigation-container a[data-hovercard-type='issue']");
        let Arr = [];
        for(let i=0;i<issueElemArr.length;i++){
            let link = $(issueElemArr[i]).attr("href");
            link = "https://github.com" + link;
            Arr.push(link);
        }
        let folderPath = path.join(__dirname,topic);
        dirCreater(folderPath);
        let filePath = path.join(folderPath, repoName + ".pdf");
        let text = JSON.stringify(Arr);
        
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
    }
}

module.exports = getIssuesPageHtml;
function dirCreater(folderPath){
    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }
}