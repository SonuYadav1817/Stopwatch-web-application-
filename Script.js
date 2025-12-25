document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startStopBtn = document.getElementById('startStopBtn');
    const lapBtn = document.getElementById('lapBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapTimesList = document.getElementById('lapTimes');

    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    let lapCount = 0;

    // Format time in HH:MM:SS.mmm format
    function formatTime(ms) {
        const date = new Date(ms);
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    // Update the display with the current time
    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }

    // Start or stop the stopwatch
    function toggleStartStop() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
            startStopBtn.textContent = 'Stop';
            startStopBtn.style.backgroundColor = '#f44336';
            lapBtn.disabled = false;
        } else {
            clearInterval(timerInterval);
            startStopBtn.textContent = 'Start';
            startStopBtn.style.backgroundColor = '#4CAF50';
        }
        isRunning = !isRunning;
    }

    // Record a lap time
    function recordLap() {
        if (!isRunning) return;
        
        lapCount++;
        const lapTime = document.createElement('li');
        lapTime.innerHTML = `<span class="lap-number">Lap ${lapCount}</span> <span class="lap-time">${formatTime(elapsedTime)}</span>`;
        
        // Add the new lap at the top of the list
        if (lapTimesList.firstChild) {
            lapTimesList.insertBefore(lapTime, lapTimesList.firstChild);
        } else {
            lapTimesList.appendChild(lapTime);
        }
    }

    // Reset the stopwatch
    function reset() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        lapCount = 0;
        updateDisplay();
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = '#4CAF50';
        lapBtn.disabled = true;
        lapTimesList.innerHTML = '';
    }

    // Event listeners
    startStopBtn.addEventListener('click', toggleStartStop);
    lapBtn.addEventListener('click', recordLap);
    resetBtn.addEventListener('click', reset);

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            toggleStartStop();
        } else if (e.code === 'KeyL' && !lapBtn.disabled) {
            recordLap();
        } else if (e.code === 'KeyR') {
            reset();
        }
    });
});
