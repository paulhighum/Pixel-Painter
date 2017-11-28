//Your code goes her

var colorArray = ["blue", "red", "orange", "rgb(97, 70, 25)", "green", "yellow", "purple", "black", "white", "rgb(6, 216, 245)", "rgb(241, 116, 230)", "rgb(219, 186, 14)", "rgb(181, 240, 236)"]
var savedColor
var drag = false
var eraser = false

function createCanvas(){
  for (var i=0; i<=Math.round(window.innerWidth/25); i++){
    var pixelColumn = document.createElement("div")
    pixelColumn.id = i
    var tempId = i
    document.querySelector("#canvas").appendChild(pixelColumn)
    for (var j=0; j<=Math.round(window.innerHeight/27); j++){
      var pixel = document.createElement("div")
      pixel.id = i + " + " + j
      createPixel(pixel)
      pixel.addEventListener("mousedown", colorClick)
      pixel.addEventListener("mouseover", colorDrag)
      document.getElementById(tempId).appendChild(pixel)
    }
  }
}
createCanvas()

function createPixel(pixel){
  pixel.style.border = "1px black solid"
  pixel.style.backgroundColor = "white"
  pixel.style.width = "20px"
  pixel.style.height = "20px"
}

function newScreenSize(){
  window.addEventListener("resize", function(){
    document.querySelector("#canvas").innerHTML = ""
    createCanvas()
  })
}

newScreenSize()

function dragChange(){
  document.querySelector("#canvas").addEventListener("mousedown", function(){
    drag = true
  })
  window.addEventListener("mouseup", function(){
    drag = false
    document.querySelector("#canvas").style.cursor = "default"
  })
}

dragChange()

function colorClick(e){
  if(eraser === false){
    e.target.style.backgroundColor = savedColor
    e.target.style.borderColor = savedColor
  } else if(eraser === true) {
    e.target.style.border = "1px black solid"
    e.target.style.backgroundColor = "white"
  }
}

function colorDrag(e){
  if(eraser === false && drag === true && e.target.style.backgroundColor === "white" && e.target.style.borderColor === "black") {
    document.querySelector("#canvas").style.cursor = "crosshair"
    e.target.style.backgroundColor = savedColor
    e.target.style.borderColor = savedColor
  } else if(eraser === true && drag === true){
    e.target.style.backgroundColor = "white"
    e.target.style.border = "1px black solid"
  }
}


function showPalette(){
  document.querySelector("#palette-display").addEventListener("mouseover", function(){
    document.querySelector("#palette").style.display = "flex"
    document.querySelector("#palette").style.flexFlow = "row wrap"
    document.querySelector("#palette").style.justifyContent = "space-around"
    document.querySelector("#palette").style.alignItems = "center"
  })
}

showPalette()

function createPalette(){
  for (var i=0; i<colorArray.length; i++){
    var paletteColor = document.createElement("div")
    paletteColor.id = colorArray[i]
    paletteColor.style.backgroundColor = colorArray[i]
    paletteColor.style.width = "20px"
    paletteColor.style.height = "20px"
    paletteColor.addEventListener("click", colorSelected)
    document.querySelector("#palette").appendChild(paletteColor)
  }
}

createPalette()

function colorSelected(event){
  document.querySelector("footer").removeChild(document.querySelector("footer").childNodes[2])
  savedColor = event.target.id
  eraser = false
  document.querySelector("#palette").style.display = "none"
  var currentColor = document.createElement("div")
  currentColor.id = "current-color"
  currentColor.style.backgroundColor = event.target.id
  currentColor.style.width = "20px"
  currentColor.style.height = "20px"
  document.querySelector("footer").appendChild(currentColor)
}

document.querySelector("#eraser").addEventListener("click", eraserSelected)

function eraserSelected(){
  document.querySelector("footer").removeChild(document.querySelector("footer").childNodes[2])
  eraser = true
  document.querySelector("#palette").style.display = "none"
  var tempEraser = document.createElement("img")
  tempEraser.src = "eraser.png"
  tempEraser.style.width = "20px"
  tempEraser.style.height = "20px"
  document.querySelector("footer").appendChild(tempEraser)
}

function newArt(){
  document.querySelector("#new-art").addEventListener("click", function(){
    location.reload()
  })
}

newArt()
