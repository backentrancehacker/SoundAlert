const toggle = document.getElementById('mic-toggle')

let record = false
let recognition
let player

toggle.addEventListener('click', () => {
	if(!('webkitSpeechRecognition' in window)) {
		return
	}

	!record ? toggle.classList.add('active') : toggle.className = 'mic-bg'
	record = !record

	start(record)
})

const alarm = () => {
	if(!player) {
		player = new Audio()
		player.src = '/alarm.mp3'	
		player.loop = true
	}
	player.play()

	setTimeout(() => {
		player.pause()
		// player = null
	}, 2000)
}

const start = r => {
	if(r) {
		recognition = new webkitSpeechRecognition()
		recognition.continuous = false
		recognition.interimResults = false
		recognition.maxAlternatives = 2

		recognition.onstart = () => {
			console.log('Recording')
		}
		recognition.onerror = err => {
			console.log(err)
			console.log('Error Recording')
			if(r) {
				toggle.click()
			}
		}
		recognition.onend = () => {
			console.log('Ended Recording')
			if(r) {
				toggle.click()
			}
		}
		recognition.onspeechend = () => {
			console.log('Ended Recording')
			if(r) {
				toggle.click()
			}
		}
		recognition.onresult = event => {
			const res = event.results[0][0].transcript
			if(/nathan|pham|talon|ethan|fam/.test(res.toLowerCase())) {
				alarm()
			}
		}
		recognition.lang = 'en-US';
		recognition.start()
	}
	else {
		recognition.stop()
		recognition = null
	}
}

