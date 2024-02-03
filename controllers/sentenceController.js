const sentenceModel = require('../models/sentenceModel');

function getSentence(sentenceName){
    const [text, index , order , name , command] = sentenceModel.sentences.get(sentenceName).getSentence();
    return {
        text: text,
        index: index,
        order: order,
        name: name,
        command: command
    };
}
exports.call = (req, res) =>{
    const sentence = getSentence('call');
    res.status(200).json({
        status: 'success',
        data: sentence
    });
}

exports.endCall = (req, res) =>{
    const sentence = getSentence('endCall');
    res.status(200).json({
        status: 'success',
        data: sentence
    });
}

exports.openChat = (req, res) =>{}

exports.closeChat = (req, res) =>{}

exports.openedChat = (req, res) =>{}

exports.readMessages = (req, res) =>{}

exports.textMessage = (req, res) =>{}

exports.voiceMessage = (req, res) =>{}

exports.block = (req, res) =>{}

exports.unblock = (req, res) =>{}