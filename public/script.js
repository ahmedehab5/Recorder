document.addEventListener('DOMContentLoaded', () => {
    const startRecordButton = document.getElementById('startRecord');
    const stopRecordButton = document.getElementById('stopRecord');
    const deleteRecordButton = document.getElementById('deleteRecord');
    const audioElement = document.getElementById('audio');
    const callButton = document.getElementById('call');
    const endCallButton = document.getElementById('endCall');
    const openChatButton = document.getElementById('openChat');
    const closeChatButton = document.getElementById('closeChat');
    const openedChatButton = document.getElementById('openedChat');
    const readMessagesButton = document.getElementById('readMessages');
    const textMessageButton = document.getElementById('textMessage');
    const voiceMessageButton = document.getElementById('voiceMessage');
    const blockButton = document.getElementById('block');
    const unblockButton = document.getElementById('unblock');
    const sendButton = document.getElementById('send');
    const nextButton = document.getElementById('next');
    const previousButton = document.getElementById('previous');

    const sentenceLabel = document.getElementById('sentence');

    callButton.addEventListener('click', call);
    endCallButton.addEventListener('click', endCall);
    openChatButton.addEventListener('click', openChat);
    closeChatButton.addEventListener('click', closeChat);
    openedChatButton.addEventListener('click', openedChat);
    readMessagesButton.addEventListener('click', readMessages);
    textMessageButton.addEventListener('click', textMessage);
    voiceMessageButton.addEventListener('click', voiceMessage);
    blockButton.addEventListener('click', block);
    unblockButton.addEventListener('click', unblock);

    sendButton.addEventListener('click', send)
    nextButton.addEventListener('click', next);
    previousButton.addEventListener('click', previous);

    let index;
    let text;
    let order;
    let name;
    let command = 'call';

    let recorder;
    let audioChunks = [];
    let timerInterval;
    let elapsedTime = 0;
    const maxRecordingTime = 10; // Set the maximum recording time limit in seconds

    startRecordButton.addEventListener('click', startRecording);
    stopRecordButton.addEventListener('click', stopRecording);
    deleteRecordButton.addEventListener('click', deleteRecord);

    function startRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                recorder = new MediaRecorder(stream);

                recorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        audioChunks.push(e.data);
                    }
                };

                recorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    audioElement.src = audioUrl;

                    deleteRecordButton.disabled = false;
                    clearInterval(timerInterval);
                    elapsedTime = 0;
                    startRecordButton.disabled = true;

                    const formData = new FormData();
                    formData.append('audio', audioBlob, 'recording.wav');
                    const additionalData = {
                        index: 'value0',
                        text: 'value1',
                        order: 'value2',
                        name: null,
                        command: 'value4',
                    };
                
                    Object.entries(additionalData).forEach(([key, value]) => {
                        formData.append(key, value);
                    });
                
                    fetch('api/v1/record/upload', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Audio data sent:', data);
                    })
                    .catch(error => {
                        console.error('Error sending audio data:', error);
                    });
                };

                recorder.onstart = () => {
                    timerInterval = setInterval(() => {
                        updateElapsedTime();
                        if (elapsedTime >= maxRecordingTime) {
                            stopRecording(); // Automatically stop recording after reaching the time limit
                        }
                    }, 1000);
                };

                recorder.start();
                startRecordButton.disabled = true;
                stopRecordButton.disabled = false;
                deleteRecordButton.disabled = true;
            })
            .catch(error => {
                console.error('Error accessing microphone:', error);
            });
    }

    function stopRecording() {
        recorder.stop();
        startRecordButton.disabled = true;
        stopRecordButton.disabled = true;
        deleteRecordButton.disabled = false;
    }

    function deleteRecord() {
        audioElement.src = '';
        deleteRecordButton.disabled = true;
        stopRecordButton.disabled = true;
        audioChunks = [];
        clearInterval(timerInterval);
        elapsedTime = 0;
        updateElapsedTime();
        startRecordButton.disabled = false; // Enable start button when recorded audio is deleted
    }

    function updateElapsedTime() {
        elapsedTime++;
        audioElement.setAttribute('data-time', formatTime(elapsedTime));
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    function send(){

    }

    async function call() {
        command = 'call';
        const res = await fetch('api/v1/sentence/call');
        const data = await res.json();
        console.log(data.data);
        sentenceLabel.textContent = data.data.text;
        // set the variables order, name, command......
    }
});
