const fs = require('fs');

counter = 0;
exports.uploadRecord = async (req, res) => {
    if (!req.files) {
        return res.status(400).json({
            status: 'fail',
            message: 'No files were uploaded.'
        });
    }
    
    try{
        const voice = req.files.audio;
        
        const fileName = `${counter}.wav`;
        const path = `${__dirname.replace('/controllers','')}/recordsData/audio/${fileName}`;
    }catch(err){
        return res.status(500).json({
            status: 'fail',
            message: 'cant get audio name or path '
        });
        console.log('cant get audio name or path');
    }
    
    voice.mv(path, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                status: 'fail',
                message: 'Server error.'
            });
        }
        
        try{
            saveParams(req);
        }
        catch(err){
            return res.status(500).json({
                status:'fail',
                message:'cant save parameters to csv'
            });
            console.log('cant save parameters to csv');
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