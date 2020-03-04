const title = document.querySelector('.title-music')
const prevBtn = document.querySelector('.fa-backward');
const playBtn = document.querySelector('.fa-play');
const nextBtn = document.querySelector('.fa-forward');
const audio = document.querySelector('audio');
const image = document.querySelector('.img');
const duration = document.querySelector('.time-duration');
const progressContainer = document.querySelector('.progress-container') 
const progress = document.querySelector('.progress') 


//Song name
let songs = ['Mekanın Sahibi','Extreme Ways','Everbody Knows','Butterflies','The Final Victory','Genius ft. Sia, Diplo, Labrinth','The Comeback Kid','Overdose','Human'];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song){
    audio.src = `music/${song}.mp3`;
    image.src = `images/${song}.jpg`;
    title.innerText = song;
}

//Play song and animation play
function playSong(){
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
   
    image.style.animationPlayState = 'running';
   
    audio.play();

}

// Pause song and animation pause
function pauseSong(){
    playBtn.classList.remove('fa-pause');
    playBtn.classList.add('fa-play');
    
    image.style.animationPlayState = 'paused';

    audio.pause();

}

// Previous song
function prevSong(e){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length -1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song
function nextSong(e){
    songIndex++;

    if(songIndex >= songs.length){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
  
    playSong();

}

// Update progress bar
function updateProgress(e){
    const{duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration; 
}

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

//Time/Song update
audio.addEventListener('timeupdate',updateProgress);

//Song ends
audio.addEventListener('ended',nextSong)

// Change song
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

//Event listeners 
playBtn.addEventListener('click',() =>{
const isPlaying = playBtn.classList.contains('fa-play');

    if(isPlaying == true){
        playSong();
    } else{
        pauseSong();
    }
});





