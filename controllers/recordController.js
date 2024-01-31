const validateRequest = require('../models/recordModel');
counter = 0;
exports.uploadRecord = async (req, res) => {
    if (!req.files) {
        return res.status(400).json({
            status: 'fail',
            message: 'No files were uploaded.'
        });
    }

    const record = req.files.record;

    const fileName = `${counter} ${record.name}`;
    const path = `${__dirname}/recordsData/audio/${fileName}`;

    record.mv(path, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                status: 'fail',
                message: 'Server error.'
            });
        }

        saveParams(req);

        counter++;
        res.status(200).json({
            status: 'success',
            message: 'File uploaded successfully.'
        });
    });
}

function saveParams(req){
    body = req.body;
    tuple = `${counter},${body.text},${body.order},${body.name},${body.command}`;
    // write this tuple as a new line in the csv file
    //code here
    //
    //
}