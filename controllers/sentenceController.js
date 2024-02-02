const sentence = require('../models/sentenceModel');

exports.call = (req, res) =>{
    try{
        const [sentence, index] = sentence.call.getSentence();
        res.json({
            sentence: sentence,
            index: index
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.endCall = (req, res) =>{
    try{
        const [sentence, index] = sentence.endCall.getSentence();
        res.json({
            sentence: sentence,
            index: index
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.openChat = (req, res) =>{
    try{
        const [sentence, index] = sentence.openChat.getSentence();
        res.json({
            sentence: sentence,
            index: index
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.closeChat = (req, res) =>{
    try{
        const [sentence, index] = sentence.closeChat.getSentence();
        res.json({
            sentence: sentence,
            index: index
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.opennedChat = (req, res) =>{
    try{
        const [sentence, index] = sentence.opennedChat.getSentence();
        res.json({
            sentence: sentence,
            index: index
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.readMessages = (req, res) =>{
    try{
        const [sentence, index] = sentence.readMessages.getSentence();
        res.json({
            sentence: sentence,
            index: index
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.textMessage = (req, res) =>{
    try{
        const [sentence, index] = sentence.textMessage.getSentence();
        res.json({
            sentence: sentence,
            index: index
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.voiceMessage = (req, res) =>{
    try{
        const [sentence, index] = sentence.voiceMessage.getSentence();
        res.json({
            sentence: sentence,
            index: index
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.block = (req, res) =>{
    try{
        const [sentence, index] = sentence.block.getSentence();
        res.json({
            sentence: sentence,
            index: index
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.unblock = (req, res) =>{
    try{
        const [sentence, index] = sentence.unblock.getSentence();
        res.json({
            sentence: sentence,
            index: index
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}