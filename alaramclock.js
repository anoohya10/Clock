function showTab(tabId) {
    var tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
}
let alarmTimeout = null;
let alarmList = [];

function setAlarm() {
    const alarmInput = document.getElementById('alarm-time').value;
    const alarmTitle = document.getElementById('alarm-title').value;
    const repeatDays = Array.from(document.querySelectorAll('.repeat-days input:checked'))
                            .map(day => day.value).join(', ');
    const selectedSound = document.getElementById('music').value;
    let alarmSound;

    if (selectedSound === 'default') {
        alarmSound = document.getElementById('default-sound');
    } else if (selectedSound === 'beep') {
        alarmSound = document.getElementById('beep-sound');
    } else if (selectedSound === 'ringtone') {
        alarmSound = document.getElementById('ringtone-sound');
    }

    if (alarmInput) {
        const alarmDate = new Date();
        const [hours, minutes] = alarmInput.split(':');
        alarmDate.setHours(hours);
        alarmDate.setMinutes(minutes);
        alarmDate.setSeconds(0);

        const now = new Date();
        const timeToAlarm = alarmDate.getTime() - now.getTime();

        if (timeToAlarm >= 0) {
            alarmTimeout = setTimeout(() => {
               if (alarmSound) {
                    alarmSound.play(); // Play the selected alarm sound
                }
                alert(`Alarm for ${alarmTitle} is ringing!`);
            }, timeToAlarm);
            alert('Alarm set!');
        } else {
            alert("Alarm time must be in the future.");
    }
    if (alarmTitle) {
        const alarm = {
            time: alarmInput,
            title: alarmTitle,
            repeat: repeatDays
        }; 
        alarmList.push(alarm);
        displayAlarms();
    } else {
        alert("Please set both time and title for the alarm.");
    }
  }
}        
function displayAlarms() {
        const alarmListContainer = document.getElementById('alarm-list');
        alarmListContainer.innerHTML = '<h3>Set Alarms:</h3>'; // Reset the list before adding new alarms
        
        alarmList.forEach((alarm, index) => {
            const alarmItem = document.createElement('div');
            alarmItem.classList.add('alarm-item');
            
            const alarmInfo = document.createElement('div');
            alarmInfo.innerHTML = `<h4>${alarm.title} - ${alarm.time}</h4><p>${alarm.repeat || 'No repeat'}</p>`;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                alarmList.splice(index, 1);
                displayAlarms(); // Refresh the alarm list after deletion
            });
            
            alarmItem.appendChild(alarmInfo);
            alarmItem.appendChild(deleteButton);
            alarmListContainer.appendChild(alarmItem);
        });
    }
function cancelAlarm() {
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cancelled.');
    }
}      
// Stopwatch functionality
let stopwatchInterval;
let stopwatchRunning = false;
let stopwatchTime = 0;
let laps = [];

document.getElementById('start-stopwatch').addEventListener('click', function() {
    if (stopwatchRunning) {
        clearInterval(stopwatchInterval);
        this.textContent = 'Start';
    } else {
        startStopwatch();
        this.textContent = 'Pause';
    }
    stopwatchRunning = !stopwatchRunning;
});

document.getElementById('reset-stopwatch').addEventListener('click', function() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchTime = 0;
    document.getElementById('stopwatch-display').textContent = '00:00:00';
    laps = [];
    document.getElementById('laps').innerHTML = '';
    document.getElementById('start-stopwatch').textContent = 'Start';
});

document.getElementById('lap-stopwatch').addEventListener('click', function() {
    if (stopwatchRunning) {
        laps.push(formatTime(stopwatchTime));
        displayLaps();
    }
});

function startStopwatch() {
    stopwatchInterval = setInterval(function() {
        stopwatchTime++;
        document.getElementById('stopwatch-display').textContent = formatTime(stopwatchTime);
    }, 1000);
}

function formatTime(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function displayLaps() {
    let lapsDiv = document.getElementById('laps');
    lapsDiv.innerHTML = '';
    laps.forEach((lap, index) => {
        lapsDiv.innerHTML += `<p>Lap ${index + 1}: ${lap}</p>`;
    });
}
//time
let totalDuration = 60 * 5; // total time in seconds
let currentTime = totalDuration;
let timerInterval;
const radius = 90;
const circumference = 2 * Math.PI * radius; // circumference of the circle

const progressCircle = document.getElementById('progress-circle');
const timeDisplay = document.getElementById('time-display');

progressCircle.style.strokeDasharray = circumference;

function updateCircleProgress(time) {
    const offset = circumference - (time / totalDuration) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        currentTime--;
        updateDisplay(currentTime);
        updateCircleProgress(currentTime);

        if (currentTime <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    currentTime = totalDuration;
    updateDisplay(currentTime);
    updateCircleProgress(currentTime);
}

function updateDisplay(time) {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    timeDisplay.textContent = `${minutes}:${seconds}`;
}
