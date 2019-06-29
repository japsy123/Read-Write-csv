const fs = require('fs'); 
const parse = require('csv-parse');
const axios = require('axios');
const { Parser } = require('json2csv');
const results = []

fs.createReadStream('input.csv')
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        axios.get(`http://api.namsor.com/onomastics/api/json/gender/${csvrow[0]}/${csvrow[1]}`)
        .then(response => { 

            results.push(response.data)
            // console.log(results)
            const fields = ['firstName', 'lastName', 'gender'];
    
             const json2csvParser = new Parser({ fields });
             const csv = json2csvParser.parse(results)
                 fs.writeFile('output.csv', csv, function(err) {
                 if (err) throw err;
                  console.log('file saved');
                 });             
        })
        .catch(error => {
          console.log(error);
        });     
    })
    .on('end',function(csvrow) {        
    });

