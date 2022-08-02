const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const artist = document.querySelector('#artistShort')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

//track songs
let songIndex = 1;

//load song
getMyData(songIndex)

//song details

function getMyData(songId) {
    fetch('http://localhost:3000/songs/' + songId)
        .then(function (response) {
            return response.json();
        })
        .then(data => showMyData(data))
}

function showMyData(song){
    title.innerText = song.songName
    const artistsContainer = document.getElementById("artistShort")
    artistsContainer.innerHTML = '';
    const div = document.createElement("div");
    div.innerText = 'Artist Name: ' + song.artistName;
    artistsContainer.appendChild(div);
    audio.src = song.song
    cover.src = song.image
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
    
    pauseSong()

    if(songIndex < 1) {
        songIndex = 10
    }

    getMyData(songIndex)
}

function nextSong() {
    songIndex++
    
    pauseSong()

    if(songIndex > 10) {
        songIndex = 1
    }

    getMyData(songIndex)
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
title.addEventListener('mouseenter', function(){
    artist.style.opacity = 1;
})
title.addEventListener('mouseout', function(){
    artist.style.opacity = 0;
})


