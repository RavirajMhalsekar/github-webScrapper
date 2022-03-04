const request = require("request");
const cheerio = require("cheerio");
const getIssuesPageHtml = require("./issues");
function getReposPageHtml(url,topic){
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }else if(response.statusCode == 404){
            console.log("page not found");
        }
        else{
            extractReposLink(html);
            // console.log(html);
        }
    }
    function extractReposLink(html){
        let $ = cheerio.load(html);
        let reposLinkArr = $(".border.rounded.color-shadow-small.color-bg-subtle.my-4 a[class='text-bold wb-break-word']");
        console.log(topic);
        for(let i=0;i<8;i++){
            let repoName = $(reposLinkArr[i]).text().trim();
            let href = $(reposLinkArr[i]).attr("href");
            href = "https://github.com" + href + "/issues";
            console.log(`${i+1} : ${repoName} : ${href}`);
            getIssuesPageHtml(href,topic,repoName);
        }
        console.log("............................");
    }
}

module.exports = getReposPageHtml;