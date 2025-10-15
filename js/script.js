let workMinutes = Number(localStorage.getItem("workMinutes")) || 25
let breakMinutes = Number(localStorage.getItem("breakMinutes")) || 5
let time = workMinutes * 60
let isBreak = false
let timer = null

const clock = document.getElementById("clock")
const changeBtn = document.getElementById("change")
const settingsEl = document.getElementById("settings")
const workInput = document.getElementById("workInput")
const breakInput = document.getElementById("breakInput")
const body = document.querySelector("body")
const colorBtn = document.getElementById("colorBtn")

colorBtn.innerText = localStorage.getItem("colorBtn") || "Light Mode"
body.style.color = localStorage.getItem("textColor") || "white"
body.style.backgroundColor = localStorage.getItem("color") || "grey"
clock.innerHTML = `${workMinutes}:00`

function updateClock() {
  const minutes = Math.floor(time / 60)
  let seconds = time % 60
  seconds = seconds < 10 ? "0" + seconds : seconds
  clock.innerHTML = `${minutes}:${seconds}`
}

function start() {
  if (time > 0) {
    time--
    updateClock()
  } else {
    clearInterval(timer)
    timer = null
  }
}

function startTimer() {
  if (!timer) timer = setInterval(start, 1000)
}

function pauseTimer() {
  clearInterval(timer)
  timer = null
}

function resetTimer() {
  clearInterval(timer)
  timer = null
  time = (isBreak ? breakMinutes : workMinutes) * 60
  updateClock()
}

function toggleMode() {
  clearInterval(timer)
  timer = null
  isBreak = !isBreak

  if (isBreak) {
    time = breakMinutes * 60
    changeBtn.innerText = "Work"
  } else {
    time = workMinutes * 60
    changeBtn.innerText = "Break"
  }

  updateClock()
}

function toggleSettings() {
  settingsEl.style.display =
    settingsEl.style.display === "none" ? "block" : "none"

  workInput.value = workMinutes
  breakInput.value = breakMinutes
}

function saveSettings() {
  workMinutes = Number(workInput.value)
  breakMinutes = Number(breakInput.value)

  localStorage.setItem("workMinutes", workMinutes)
  localStorage.setItem("breakMinutes", breakMinutes)

  resetTimer()

  settingsEl.style.display = "none"
}

function toggleColor() {
	const color = body.style.backgroundColor

	if (color === "grey") {
		body.style.backgroundColor = "white"
		colorBtn.innerText = "Dark Mode"
		body.style.color = "black" 
	} else { 
		body.style.backgroundColor = "grey"
		body.style.color = "white"
		colorBtn.innerText = "Light Mode"
	}	

	localStorage.setItem("color", body.style.backgroundColor)
	localStorage.setItem("colorBtn", colorBtn.innerText)
	localStorage.setItem("textColor", body.style.color)
}