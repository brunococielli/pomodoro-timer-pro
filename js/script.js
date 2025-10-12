const startingMinutes = 25
let time = startingMinutes * 60

const clock = document.getElementById("clock")
clock.innerHTML = `${startingMinutes}:00`
let timer

function start() {
	time > 0 ? time-- : clearInterval(timer)

	const minutes = Math.floor(time / 60)
	let seconds = time % 60

	seconds < 10 ? seconds = "0" + seconds: seconds

 	clock.innerHTML = `${minutes}:${seconds}`
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
	time = startingMinutes * 60
	clock.innerHTML = `${startingMinutes}:00`
}