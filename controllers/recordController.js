const fs = require('fs');
const Record = require('../models/recordModel');
const sentences = require('../models/sentenceModel').sentences;

counter = Number(process.env.COUNTER);
async function setCounter(){
    const noOfDocs = await Record.countDocuments();
    counter += noOfDocs;
    console.log('counter:', counter);
}

setCounter();

exports.uploadRecord = async (req, res) => {
    if (!req.files) {
        return res.status(400).json({
            status: 'fail',
            message: 'No files were uploaded.'
        });
    }
        
    try{
        await Record.create({
            index: counter,
            text: req.body.text,
            order: req.body.order,
            name: req.body.name,
            command: req.body.command,
            audio: req.files.audio.data
        });
        sentences.get(req.body.command).pointerIncrement(req.body.index);
    }
    catch(err){
        return res.status(500).json({
            status:'fail',
            message:'cant save record'
        });
    }
    counter++;

    res.status(200).json({
        status: 'success',
        message: 'File uploaded successfully.'
    });
}