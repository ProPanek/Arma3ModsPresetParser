const cheerio = require('cheerio');
const fs = require('fs');
let fileName = ""
fs.readdir("./", (err, files) => {
    files.forEach(file => {
        const split = file.split(".")
        if (split[split.length - 1] === "html")
             fileName = file
    });

    fs.readFile(`./${fileName}`, function (err, html) {
        if (err) {
            throw err;
        }
        const parsed = cheerio.parseHTML(html.toString());
        const $ = cheerio.load(parsed)
        const modsIdArray = []
        const modsNamesArray = []

        $("[data-type=ModContainer]").map((i, element) => {
            modsIdArray.push(`@${$(element).find('td:nth-of-type(3)').text().trim().split("=")[1]}`)
            modsNamesArray.push(`@${$(element).find('td:nth-of-type(3)').text().trim().split("=")[1]} - ${$(element).find('td:nth-of-type(1)').text().trim()}`)
        })
        const modNamesString = modsNamesArray.join("\n")
        const modString = '-mod="' + modsIdArray.join(";") + "\""
        const modStringEx = modsIdArray.join(";") + "\""

        const result = modNamesString + "\n\n" + modString + "\n\n" + modStringEx

        console.log(result)
        fs.writeFile(`greatest_sacred_automated_mod_list_file_for_${fileName}.txt`, result, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });

    });
});




