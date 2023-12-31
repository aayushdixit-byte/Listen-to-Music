let songIndex = 0;
let audioElement = new Audio('songs/1.mpeg');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById("myProgressBar")
let masterSongName = document.getElementById("masterSongName")
let gif = document.getElementById("gif")
let searchIcon = document.getElementById("search-icon")
let searchBar = document.querySelector('.search')
let searchDiv = document.querySelector('.search-result')
let closeBtn = document.querySelector('.close')
let songItems = Array.from(document.getElementsByClassName('songItems'))

let songs = [
    { songName: "Aankh Lad Jaave", filePath: "songs/1.mpeg", coverPath: "covers/1.jpeg" },
    { songName: "Jhoome Jo Pathaan", filePath: "songs/2.mpeg", coverPath: "covers/2.jpeg" },
    { songName: "Srivalli", filePath: "songs/3.mpeg", coverPath: "covers/3.jpeg" },
    { songName: "Haaye Oye", filePath: "songs/4.mpeg", coverPath: "covers/4.jpeg" },
    { songName: "Tere Pyaar Mei", filePath: "songs/5.mpeg", coverPath: "covers/5.jpeg" },
    { songName: "Afgaan Jalebi", filePath: "songs/6.mpeg", coverPath: "covers/6.jpeg" },
    { songName: "4 Bottle Vodka", filePath: "songs/7.mpeg", coverPath: "covers/7.jpeg" },
    { songName: "Pyaar Hota Kayi Baar Hai", filePath: "songs/8.mpeg", coverPath: "covers/8.jpeg" },
    { songName: "Kamariya", filePath: "songs/9.mpeg", coverPath: "covers/9.jpeg" },
    { songName: "Game Of Thrones", filePath: "songs/10.mpeg", coverPath: "covers/10.jpeg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName
})

// audioElement.play();

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = '1'
        masterSongName.innerText = songs[songIndex].songName
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            if (element.id == songIndex) {
                element.classList.remove('fa-circle-play')
                element.classList.add('fa-circle-pause')
            }
        })
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = '0'
        makeAllPlays()
    }
})

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            makeAllPlays()
            songIndex = parseInt(e.target.id)
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            audioElement.src = `songs/${songIndex + 1}.mpeg`
            audioElement.currentTime = 0
            audioElement.play()
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
            gif.style.opacity = '1'
            masterSongName.innerText = songs[songIndex].songName
        }
        else {
            audioElement.pause()
            gif.style.opacity = '0'
            e.target.classList.add('fa-circle-play')
            e.target.classList.remove('fa-circle-pause')
            masterPlay.classList.add('fa-circle-play')
            masterPlay.classList.remove('fa-circle-pause')
            myProgressBar.value = progress
            masterSongName.innerText = songs[songIndex].songName
        }
    })
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex < 0) {
        songIndex = 8
    }
    else {
        songIndex -= 1
    }
    makeAllPlays()
    audioElement.src = `songs/${songIndex + 1}.mpeg`
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        if (element.id == songIndex) {
            element.classList.remove('fa-circle-play')
            element.classList.add('fa-circle-pause')
        }
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex > 8) {
        songIndex = 0
    }
    else {
        songIndex += 1
    }
    makeAllPlays()
    audioElement.src = `songs/${songIndex + 1}.mpeg`
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        if (element.id == songIndex) {
            element.classList.remove('fa-circle-play')
            element.classList.add('fa-circle-pause')
        }
    })
})

searchIcon.addEventListener('click', () => {
    let query = searchBar.value
    query = query[0].toUpperCase() + query.slice(1);
    for (i = 0; i < query.length; i++) {
        if (query[i] == ' ') {
            query = query.slice(0, i + 1) + query[i + 1].toUpperCase() + query.slice(i + 2)
        }
    }
    flag = 0;
    key = 0;
    for (i = 0; i < songs.length; i++) {
        if (query == songs[i].songName) {
            flag = 1
            key = i
            break
        }
        else {
            flag = 0
        }
    }
    if (flag == 1) {
        searchDiv.style.display = "block"
        document.getElementById('search-img').src = songs[key].coverPath
        document.getElementsByClassName('searchSongName')[0].innerText = songs[key].songName
        // document.getElementsByClassName('searchSongName')[0].addEventListener('click',()=>{
        searchDiv.addEventListener('click', () => {
            songIndex = parseInt(key)
            audioElement.src = `songs/${songIndex + 1}.mpeg`
            audioElement.currentTime = 0
            audioElement.play()
            makeAllPlays()
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
            gif.style.opacity = '1'
            masterSongName.innerText = songs[songIndex].songName
            Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
                if (element.id == songIndex) {
                    element.classList.remove('fa-circle-play')
                    element.classList.add('fa-circle-pause')
                }
            })
        })
    }
    else {
        alert(`No such song named ${query}`)
        searchBar.value = ''
        searchDiv.style.display = "none"
        closeBtn.style.display = "none"
    }
})

closeBtn.addEventListener('click', () => {
    searchBar.value = ''
    searchDiv.style.display = "none"
    closeBtn.style.display = "none"
})

function getValue() {
    closeBtn.style.display = 'block'
    let value = searchBar.value
    searchDiv.style.display = "block"
    if (value.length) {
        value = value[0].toUpperCase() + value.slice(1);
    }
    for (i = 0; i < value.length; i++) {
        if (value[i] == ' ') {
            value = value.slice(0, i + 1) + value[i + 1].toUpperCase() + value.slice(i + 2)
        }
    }
    green = 0
    for (i = 0; i < songs.length; i++) {
        if (value == songs[i].songName.slice(0, value.length)) {
            key = i
            green = 1
            break
        }
        else {
            green = 0
        }
    }
    if (green == 1) {
        document.getElementById('search-img').src = songs[key].coverPath
        document.getElementsByClassName('searchSongName')[0].innerText = songs[key].songName
        // document.getElementsByClassName('searchSongName')[0].addEventListener('click',()=>{
        searchDiv.addEventListener('click', () => {
            songIndex = parseInt(key)
            audioElement.src = `songs/${songIndex + 1}.mpeg`
            audioElement.currentTime = 0
            audioElement.play()
            makeAllPlays()
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
            gif.style.opacity = '1'
            masterSongName.innerText = songs[songIndex].songName
            Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
                if (element.id == songIndex) {
                    element.classList.remove('fa-circle-play')
                    element.classList.add('fa-circle-pause')
                }
            })
        })
        document.getElementsByClassName('message')[0].innerText = '';
    }
    else {
        document.getElementsByClassName('message')[0].innerText = 'No such song found';
        document.getElementsByClassName('message')[0].style.margin = '30px'
        document.getElementsByClassName('message')[0].style.color = 'red'
        document.getElementById('search-img').src = ''
        document.getElementsByClassName('searchSongName')[0].innerText = ''
    }
    if (value.length == 0) {
        searchDiv.style.display = "none"
        closeBtn.style.display = "none"
    }
}

// const songsApi = async () => {
//     const url = 'https://deezerdevs-deezer.p.rapidapi.com/artist/%7Bid%7D';
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '3807ac9334msh9e147b3b52fc94bp1df104jsnbba908173ce0',
//             'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await fetch(url, options);
//         const result = await response.text();
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// }
// songsApi()

const accessToken = 'ffe3c97d8ed94db8902e3904cdd548db';

fetch('https://api.spotify.com/v1/me', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
