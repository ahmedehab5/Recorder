class Sentence {
    constructor(sentences){
        this.sentences = sentences;
        this.counter = 0;
    }

    getRandName(){
        const names = ['محمد','علي','محمود','احمد','عبدالله','عبدالرحمن','عبدالعزيز','عبداللطيف','عبدالمجيد','عبدالحميد'];
        const index = Math.floor(Math.random() * names.length);
        return names[index];
    }

    checkNameInSentence(sentence){
        // update this method
        return sentence.replace(/<name>/g, this.getRandName());
    }

    getSentence(){
        const index = this.counter % this.sentences.length;
        const sentence = this.sentences[index];
        return [this.checkNameInSentence(sentence), index];
    }

    pointerIncrement(index){
        if(index == this.counter % this.sentences.length){
            this.counter++;
        }
    }
}

exports.call = new Sentence(['اتصل ب<name>','اتصل على <name>']);
exports.endCall = new Sentence(['انهي المكالمة','انهي الاتصال','اغلق المكالمة','اغلق الاتصال']);
exports.openChat = new Sentence(['افتح الدردشة مع <name>','افتح الشات مع <name>','ابدأ الدردشة مع <name>','افتح المحادثة مع <name>']);
exports.closeChat = new Sentence(['اغلق الدردشة','اغلق الشات','اغلق المحادثة','انهي الدردشة','انهي الشات','انهي المحادثة']);
exports.opennedChat = new Sentence(['محادثة من مفتوحة الان','هل توجد محادثة مفتوحة']);
exports.readMessages = new Sentence(['اقرا رسائل <name>','اقرا الرسائل','اقرا الرسائل الواردة','اقرا الرسائل الجديدة']);
exports.textMessage = new Sentence(['ارسل رسالة نصية الى <name>','ارسل رسالة الى <name>','ارسل رسالة نصية']);
exports.voiceMessage = new Sentence(['ارسل رسالة صوتية الى <name>','ارسل رسالة صوتية']);
exports.block = new Sentence(['قم بحظر <name>','قم بحظر الرقم','قم بحظر الرقم']);
exports.unblock = new Sentence(['قم بفك الحظر عن <name>','قم بفك الحظر عن الرقم','قم بفك الحظر عن الرقم']);

