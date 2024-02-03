const names = ['محمد','علي','محمود','احمد','عبدالله','عبدالرحمن','عبدالعزيز','عبداللطيف','عبدالمجيد','عبدالحميد','سيد','سعيد','سعود','سلمان','سليمان','سامي','سامح','سامر'];

class Sentence {
    constructor(sentences){
        this.sentences = sentences;
        this.counter = 0;
    }

    getRandName(){
        // no of names to be used in the sentence
        const namesLimit = 2;
        const noNames = Math.floor(Math.random() * namesLimit) + 1;
        let name = '';
        for(let i = 0; i < noNames; i++){
            const index = Math.floor(Math.random() * names.length);
            name += names[index] + ' ';
        }
        name = name.trim();
        return name;
    }

    checkNameInSentence(sentence){
        if (sentence.includes('x')){
            let name = this.getRandName();
            return [sentence.replace(/x/g, name), name];
        }
        
        return [sentence, ''];
    }

    getSentence(){
        const index = this.counter % this.sentences.length;
        const sentence = this.sentences[index];
        const order = '';
        const command = '';
        const [renderedSentence, name] = this.checkNameInSentence(sentence);
        return [renderedSentence, index , order , name , command];
    }

    pointerIncrement(index){
        if(index == this.counter % this.sentences.length){
            this.counter++;
        }
    }
}

exports.call = new Sentence(['اتصل بx','اتصل على x']);
exports.endCall = new Sentence(['انهي المكالمة','انهي الاتصال','اغلق المكالمة','اغلق الاتصال']);
exports.openChat = new Sentence(['افتح الدردشة مع x','افتح الشات مع x','ابدأ الدردشة مع x','افتح المحادثة مع x']);
exports.closeChat = new Sentence(['اغلق الدردشة','اغلق الشات','اغلق المحادثة','انهي الدردشة','انهي الشات','انهي المحادثة']);
exports.openedChat = new Sentence(['محادثة من مفتوحة الان','هل توجد محادثة مفتوحة']);
exports.readMessages = new Sentence(['اقرا رسائل x','اقرا الرسائل','اقرا الرسائل الواردة','اقرا الرسائل الجديدة']);
exports.textMessage = new Sentence(['ارسل رسالة نصية الى x','ارسل رسالة الى x','ارسل رسالة نصية']);
exports.voiceMessage = new Sentence(['ارسل رسالة صوتية الى x','ارسل رسالة صوتية']);
exports.block = new Sentence(['قم بحظر x','قم بحظر الرقم','قم بحظر الرقم']);
exports.unblock = new Sentence(['قم بفك الحظر عن x','قم بفك الحظر عن الرقم','قم بفك الحظر عن x']);

const sentences = new Map();
sentences.set('call', exports.call);
sentences.set('endCall', exports.endCall);
sentences.set('openChat', exports.openChat);
sentences.set('closeChat', exports.closeChat);
sentences.set('openedChat', exports.openedChat);
sentences.set('readMessages', exports.readMessages);
sentences.set('textMessage', exports.textMessage);
sentences.set('voiceMessage', exports.voiceMessage);
sentences.set('block', exports.block);
sentences.set('unblock', exports.unblock);


exports.sentences = sentences;