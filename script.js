const setAlarm = document.getElementById('setAlarm')
const clearAlarm = document.getElementById('clearAlarm')
const time = document.getElementById('time')
const audio = new Audio('https-__bestringtones.net_music_Chorni.mp3')


function getTime() {
    const date = new Date()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    let totalSeconds = h * 3600 + m * 60 + s
    let formattedHours = h % 12;
    formattedHours = formattedHours === 0 ? 12 : formattedHours;
    const amOrPm = h >= 12 ? 'PM' : 'AM';

    if (formattedHours < 10) {
        formattedHours = "0" + formattedHours
    }
    if (m < 10) {
        m = "0" + m
    }
    if (s < 10) {
        s = "0" + s
    }

    let time = `${formattedHours}:${m}:${s} ${amOrPm}`
    return [time, totalSeconds]
}

setInterval(() => {
    const currentTime = getTime()
    time.querySelector('h1').innerHTML = currentTime[0]
}, 1000)


let alarmSet;
setAlarm.addEventListener('click', () => {

    const inputTime = document.getElementById('timeInput').value
    const [userHours, userMinutes] = inputTime.split(":").map(Number);
    console.log(userHours, userMinutes)

    if (!inputTime) {
        alert("Please select a valid Time")
        return
    }
    const alarmDate = new Date();
    alarmDate.setHours(userHours, userMinutes, 0, 0)
    console.log(alarmDate.getTime())
    const now = new Date()
    console.log(now.getTime())
    if (alarmDate < now) {
        console.log("Select Future Time")
        return
    }
    const untilAlarmTime = alarmDate - now
    console.log(untilAlarmTime)
    alarmSet = setTimeout(() => {
        audio.play();
    }, untilAlarmTime)

})

clearAlarm.addEventListener('click',()=>{
    clearTimeout(alarmSet)
    audio.pause()
    audio.currentTime = 0
})
