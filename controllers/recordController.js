const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

counter = 0;
exports.uploadRecord = async (req, res) => {
    saveParams(req);
    if (!req.files) {
        return res.status(400).json({
            status: 'fail',
            message: 'No files were uploaded.'
        });
    }

    const voice = req.files.voice;

    const fileName = `${counter}.mp3`;
    const path = `${__dirname.replace('/controllers','')}/recordsData/audio/${fileName}`;

    voice.mv(path, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                status: 'fail',
                message: 'Server error.'
            });
        }


        counter++;
        res.status(200).json({
            status: 'success',
            message: 'File uploaded successfully.'
        });
    });
}

function saveParams(req){
    body = req.body;
    tuple = `${counter},${body.text},${body.order},${body.name},${body.command}\n`;
    
    fs.appendFile('recordsData/dataset.csv', tuple, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          return;
        }
    });
      
}