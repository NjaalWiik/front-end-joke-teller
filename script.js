const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/enable button
const toggleButton = () => (button.disabled = !button.disabled);

// Get jokes from joke API
const getJokes = async () => {
  let joke = '';
  const apiUrl =
    'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=religious,political,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    data.setup
      ? (joke = `${data.setup} ...  ${data.delivery}`)
      : (joke = data.joke);

    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    console.log(error);
  }
};

// Pass joke to VoiceRSS API
const tellMe = joke => {
  VoiceRSS.speech({
    key: '9e7694c30e044947b823cce9276303f3',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
};

// Event listeners
button.addEventListener('click', getJokes);
audio.addEventListener('ended', toggleButton);
