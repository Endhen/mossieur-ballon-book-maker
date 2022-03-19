const colors = [
    '#F2C7C7', // red
    '#F2D9EB', // pink
    '#C3C6E5', // purple
    '#A3D0D9', // blue
    '#BAE3D9', // green
]

var pages = document.querySelectorAll('.page')

function rand(min, max) {  
    min = Math.ceil(min);  
    max = Math.floor(max);  
    return Math.floor(Math.random() * (max - min)) + min;   
}  

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
  }


function setColors(page) {

    var balloonGroups = [
        document.querySelectorAll('.page:nth-child(' + page +  ') .balloon-bottom-left circle'),
        document.querySelectorAll('.page:nth-child(' + page +  ') .balloon-top-left circle'),
        document.querySelectorAll('.page:nth-child(' + page +  ') .balloon-top-right circle'),
        document.querySelectorAll('.page:nth-child(' + page +  ') .balloon'),
    ],  balloonCord = document.querySelectorAll('.page:nth-child(' + page +  ') .balloon-cord');
    
    function applyColor(balloons, color) {
    
        for (let i = 0; i < balloons.length; i++) {
            balloons[i].style.fill = color
        }
        for (let j = 0; j < balloonCord.length; j++) {
            balloonCord[j].style.stroke = color
        }
    }
    
    shuffleArray(colors)
    
    balloonGroups.forEach((balloonGroup, i) => {
        let j =  (i + 1) % colors.length
        applyColor(balloonGroup, colors[j - 1])  
    });
}

function setPageNumber(page) {
    let pageNumber = document.querySelectorAll('.page:nth-child(' + page + ') .page-number')
    pageNumber[0].innerText = page - 1
}

function setLevel() {
    let level = document.querySelector('[data-level]')
    let cords = document.querySelectorAll('.difficulty svg path:nth-child(1)')
    let balloons = document.querySelectorAll('.difficulty svg path:nth-child(2)')

    console.log(balloons[0])
    for(let i=0; i < level.dataset.level; i++) {
        if (balloons.length >= level.dataset.level) {
            balloons[i].style.fill = '#529FAC'
            cords[i].style.stroke = '#529FAC'
        }
    }
}

window.onload = function() {

    setLevel()
    pages.forEach((page, i) => {
        page = i + 2
        setColors(page)
        setPageNumber(page)
    })
}



