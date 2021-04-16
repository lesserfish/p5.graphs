class Node
  {
    constructor(_id)
    {
      this.nid = _id
      this.value = Math.floor(Math.random()*2)
      this.Neighbours = []
      this.PosX = 0
      this.PosY = 0
    }
  }

let slider;
let effect1;
function preload()
{
    effect1 = loadSound("effect2.wav")
}
function setup() {
  frameRate(5)
  effect1.setVolume(0.5)
  createCanvas(windowWidth, windowHeight);
  fill(200, 200, 200)
  sizeSlider = createSlider(3, 70, 40);
  sizeSlider.position(100, height-65);
  sizeSlider.input(UpdateValues)
  randSlider = createSlider(0, 1000, 500);
  randSlider.position(100, height-45);
  randSlider.input(UpdateValues)
  framerateSlider = createSlider(1, 12, 5);
  framerateSlider.position(100, height-90);
  framerateSlider.input(UpdateFR)
  
  volumeSlider = createSlider(0, 100, 50);
  volumeSlider.position(100, height-110);
  volumeSlider.input(UpdateVolume)
  
  setvariables()
  createnodes()
  paintbackground()
  paintnodes()
}
function setvariables()
{
  exconst = 40
  nList = []
  nSize = sizeSlider.value();
  ballSize = 15
  maxradius = Math.min(windowWidth/2, windowHeight / 2)
  normalizedrand = randSlider.value()/1000
  randcomprob = (Math.pow(exconst, normalizedrand) - 1)/(exconst - 1)
}
function createnodes()
{
  for(i = 0; i < nSize; i++)
    {
      newnode = new Node(i)
      ang = Math.random()*2*Math.PI
      rad = Math.random() * (maxradius)
      newnode.PosX = windowWidth/2 + rad * Math.cos(ang)
      newnode.PosY = windowHeight/2 + rad * Math.sin(ang)
      
      nList.push(newnode)
    }
  
  for(i = 0; i < nSize - 1; i++)
    {
      for(j = i + 1; j < nSize; j++)
        {
          nrand = Math.random()
          if(nrand <= randcomprob)
            {
              nList[i].Neighbours.push(j)
              nList[j].Neighbours.push(i)
            }
        }
    }
}

function paintbackground()
{
  background(0, 0, 0);
  
  for(i = 0; i < nList.length; i++)
    {
      node = nList[i]
      x = node.PosX
      y = node.PosY
      
      for(j = 0; j < node.Neighbours.length; j++)
        {
          Ne = nList[node.Neighbours[j]]
          vx = Ne.PosX
          vy = Ne.PosY
          fill(255, 255, 255)
          stroke(125)
          line(x, y, vx, vy)
        }
    }
  
  textSize(15);
  fill(200, 200, 200);
  text('Graph Size:', 10, height-50);
  text('Connectivity:', 10, height-30);
  text('Speed:', 10, height-75);
  text('Volume:', 10, height-95);
}
function paintnodes()
{
  for(i = 0; i < nList.length; i++)
    {
      node = nList[i]
      x = node.PosX
      y = node.PosY
      
      if(node.value == 0)
        fill(200, 0, 0)
      else
        fill(0, 0, 200)
      
      ellipse(x, y, ballSize, ballSize)
    }
}
function draw() {
  
  for(i = 0; i < nList.length; i++)
    {
      cchange = (i + Math.floor(Math.random()* nList.length)) % nList.length
      
      ncount = nList[cchange].Neighbours.length
      
      if(ncount > 0)
        {
          nchange = Math.floor(Math.random() * ncount)
          nei = nList[cchange].Neighbours[nchange]
          
          if(nList[cchange].value != nList[nei].value)
            {
              nList[cchange].value = nList[nei].value
              effect1.play()
              
              x = nList[cchange].PosX
              y = nList[cchange].PosY
      
              if(nList[cchange].value == 0)
                fill(200, 0, 0)
              else
                fill(0, 0, 200)
      
              ellipse(x, y, ballSize, ballSize)
              break
            }
        }
    }
}
  
  function keyPressed()
  {
    if(keyCode == ENTER || keyCode == ESCAPE)
      {
        UpdateValues()
      }
  }
  
  function UpdateValues()
  {
        setvariables()
        createnodes()
        paintbackground()
        paintnodes()
  }
  function UpdateFR()
  {
    frameRate(framerateSlider.value())
  }
  function UpdateVolume()
  {
    effect1.setVolume(volumeSlider.value()/100)
  }
  
  

