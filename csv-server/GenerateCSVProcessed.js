const csv = require('csv-parser');
const fs = require('fs');

let results = [];

fs.createReadStream('./input/Delitos_Violentos_Preproceso.csv')
    .pipe(csv())
    .on('data', (row) => {
        console.log(row);
        results.push(row);


    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        fs.writeFileSync("output/Delitos_Violentos_Preproceso.json", JSON.stringify(results), 'utf8', function (err) {
            if (err) {
                console.log(err);
            }
        });
    });