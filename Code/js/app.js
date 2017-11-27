//Your code goes her

var colorArray = ["blue", "red", "orange", "green", "yellow", "purple", "black", "white", "rgb(6, 216, 245)", "rgb(241, 116, 230)", "rgb(219, 186, 14)"]
var savedColor
var drag = false

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
      pixel.addEventListener("mousedown", function(e){
        e.target.style.backgroundColor = savedColor
        e.target.style.borderColor = savedColor
      })
      pixel.addEventListener("mouseover", function(e){
        if (drag === true){
          document.querySelector("#canvas").style.cursor = "crosshair"
          e.target.style.backgroundColor = savedColor
          e.target.style.borderColor = savedColor
        }
      })
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

function dragColor(){
  document.querySelector("#canvas").addEventListener("mousedown", function(){
    drag = true
  })
  window.addEventListener("mouseup", function(){
    drag = false
    document.querySelector("#canvas").style.cursor = "default"
  })
}

dragColor()


function showPalette(){
  document.querySelector("#palette-display").addEventListener("mouseover", function(){
    document.querySelector("#palette").style.display = "flex"
    document.querySelector("#palette").style.flexFlow = "row"
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
    paletteColor.addEventListener("click",function(event){
      document.querySelector("footer").removeChild(document.querySelector("footer").childNodes[2])
      savedColor = event.target.id
      document.querySelector("#palette").style.display = "none"
      var currentColor = document.createElement("div")
      currentColor.id = "current-color"
      currentColor.style.backgroundColor = event.target.id
      currentColor.style.width = "20px"
      currentColor.style.height = "20px"
      document.querySelector("footer").appendChild(currentColor)
    })
    document.querySelector("#palette").appendChild(paletteColor)
  }
}

createPalette()

function newArt(){
  document.querySelector("#new-art").addEventListener("click", function(){
    location.reload()
  })
}

newArt()
