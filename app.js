console.log('ACe_StJude Companion loaded');

const startButton = document.createElement("button");
startButton.innerText = "🎤 Start Listening";
document.body.appendChild(startButton);

startButton.onclick = () => {
    console.log("🔔 Starting microphone...");
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            console.log("🎙️ Microphone access granted");

            const mediaRecorder = new MediaRecorder(stream);
            let audioChunks = [];

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                console.log("🎧 Audio captured:", audioBlob);

                // Placeholder: send to Whisper or Azure STT
                // sendToWhisper(audioBlob);
            };

            mediaRecorder.start();
            console.log("📣 Recording started for 5 seconds...");

            setTimeout(() => {
                mediaRecorder.stop();
                console.log("🛑 Recording stopped");
            }, 5000);
        })
        .catch(err => {
            console.error("🚫 Microphone access denied:", err);
        });
};
