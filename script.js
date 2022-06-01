const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

const apiKey = '380495387da24c818ffb1f36f4cbf0ff'

function tellMe(joke) {
  VoiceRSS.speech({
    key: `${apiKey}`,
    src: `${joke}`,
    hl: 'en-us',
    v: 'Mary',
    r: 2,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  })
}

function toggleButton() {
  button.disabled = !button.disabled
}

async function getJoke() {
  let joke = ''
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
  try {
    const response = await fetch(`${apiUrl}`)
    const data = await response.json()
    if (data.joke) {
      joke = data.joke
    } else {
      joke = `${data.setup} ${data.delivery}`
    }
    tellMe(joke)
    toggleButton()
  } catch (err) {
    console.log(err)
  }
}

button.addEventListener('click', getJoke)
audioElement.addEventListener('ended', toggleButton)
