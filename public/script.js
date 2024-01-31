document.addEventListener('DOMContentLoaded', () => {
    const startRecordButton = document.getElementById('startRecord');
    const stopRecordButton = document.getElementById('stopRecord');
    const playbackButton = document.getElementById('playback');
    const audioElement = document.getElementById('audio');

    let recorder;
    let audioChunks = [];

    startRecordButton.addEventListener('click', startRecording);
    stopRecordButton.addEventListener('click', stopRecording);
    playbackButton.addEventListener('click', playbackRecording);

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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

            playbackButton.disabled = false;

            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.wav');

            const additionalData = {
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

        recorder.start();
        startRecordButton.disabled = true;
        stopRecordButton.disabled = false;
        playbackButton.disabled = true;
    }

    function stopRecording() {
        recorder.stop();
        startRecordButton.disabled = false;
        stopRecordButton.disabled = true;
    }

    function playbackRecording() {
        audioElement.play();
    }
});
