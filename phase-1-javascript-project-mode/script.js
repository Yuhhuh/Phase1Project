const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const artist = document.querySelector('#artistShort')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

//Song Titles
const songs = ['4 AM', '8299.FM', 'The Bygone Days']

//track songs
let songIndex = songs.indexOf('4 AM') + 2;

//load song
loadSong(songs[songIndex])

//shuffle songs


//song details
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevSong() {
    songIndex--

    if(songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()
}

function nextSong() {
    songIndex++

    if(songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}

function appendArtist(songs) {
    var artistsContainer = document.getElementById("artistContainer")
    for (var i = 0; i < songs.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = 'Artist Name: ' + songs[i].artistName;
        artistsContainer.appendChild(div);
    }
}






//event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

//change songs
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
artist.addEventListener('mouseenter', function(){
    artist.style.opacity = 1;
})
artist.addEventListener('mouseout', function(){
    artist.style.opacity = 0;
})

artist.addEventListener('click', function(){
    fetch('http://localhost:3000/songs')
.then(function (response){
    return response.json();
})
.then(function (songs) {
    appendArtist(songs);
})
.catch(function (err) {
    console.log('error: ' + err);
})
})
