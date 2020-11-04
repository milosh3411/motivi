// Height and width of motif
var a
// Maximum number of visible motif columns/rows 
var cmax,rmax
// The motif
var mf
// The meta motif
var mmf
//Plannar symmetry picker
var symm_pick
// canvas
var cnv
// colors
var clr = []

function setup() {
  // color scheme
  clr[0] = color(214,162,173);
  clr[1] = color(195,181,159);
  clr[2] = color(160,175,132);
  clr[3] = color(102,143,128);
  clr[4] = color(74,102,112);

  frameRate(1);
  cmax=4;
  rmax=12;
  symm_pick = 0;
  if (displayWidth<displayHeight) {
    a = round(displayWidth/cmax)/2
    rmax = round(displayHeight/(2*a))
  } else {
    a = round(displayHeight/rmax)/2
    cmax = round(displayWidth/(2*a))
  }
  cnv = createCanvas(displayWidth,displayHeight);
  create_motif();
  noLoop();
  cnv.touchEnded(change_it); 
}

function create_motif() {
  mf = createGraphics(a, a);
  mf.background(0);
  var c = round(random(-0.5,4.5))
  //mf.fill(150, 150)
  //mf.ellipse(a/4, a/6, a/3);
  //mf.text("Milos", a/10, a/10, a, a)
  mf.noFill()
  mf.stroke(clr[c])
  mf.strokeWeight(random(2,10))
  mf.ellipse(a/2+random(-a/2, a/2), a/2+random(-a/2, a/2), random(a/2, 1.41*a))
  c = round(random(-0.5,4.5))
  mf.stroke(clr[c])
  mf.strokeWeight(random(2,10))
  mf.fill(50,100)
  mf.ellipse(a/2+random(-a/2, a/2), a/2+random(-a/2, a/2), random(a/2, 1.41*a))
} 


function create_motif1() {
  //deblja i tanja kruznica, bez ispune
  mf = createGraphics(a, a);
  mf.background(0);
  //mf.fill(150, 150)
  //mf.ellipse(a/4, a/6, a/3);
  //mf.text("Milos", a/10, a/10, a, a)
  mf.noFill()
  mf.stroke(100)
  mf.strokeWeight(4)
  mf.ellipse(a/2+random(-a/2, a/2), a/2+random(-a/2, a/2), random(a/2, 1.41*a))
  mf.strokeWeight(2)
  mf.ellipse(a/2+random(-a/2, a/2), a/2+random(-a/2, a/2), random(a/2, 1.41*a))
} 


function m_empty() {
  m = createGraphics(a,a);
  return m;
}

function m_mirror(img) {
  var a = img.width
  m = createGraphics(a,a);
  m.scale(-1.0,1.0);
  m.translate(-a,0);
  m.image(img,0,0);
  return m;
}

function m_rotate(img,ang) {
  var a = img.width
  m = createGraphics(a,a);
  m.translate(a/2,a/2);
  m.rotate(ang);
  m.translate(-a/2,-a/2);
  m.image(img,0,0);
  return m;
}

function create_metamotif() {

  //Remove any prevoius meta-motif graphic object
  if (mmf) {
    mmf.remove();
  }

  //Graphics for 4 quadrants:
  var q1,q2,q3,q4;
 
  // Pick plannar symmetry type for meta-motif
  switch (symm_pick) {
    case 0:
      q1 = mf
      q2 = mf
      q3 = mf
      q4 = mf
      break;
    case 1:
      q1 = mf
      q2 = m_empty()
      q3 = m_mirror(q1)
      q4 = m_empty()
      break;
    case 2:
      q1 = mf
      q2 = m_mirror(q1);
      q3 = m_mirror(q1);
      q4 = q1;
      break;
    case 3:
      q1 = mf
      q2 = m_empty()
      q3 = q1
      q4 = m_empty()
      break;
    case 4:
      q1 = mf
      q2 = m_rotate(q1,PI)
      q3 = m_empty()
      q4 = m_empty()
      break;
    case 5:
      q1 = mf
      q2 = m_mirror(q1);
      q3 = m_rotate(q1,PI);
      q4 = m_rotate(q2,PI);
      break;
    case 6:
      q1 = mf
      q2 = m_rotate(q1,PI/2);
      q3 = m_rotate(q2,PI/2);
      q4 = m_rotate(q3,PI/2);
      break;
  }

  mmf = createGraphics(2*a,2*a);
  mmf.background(0)

  mmf.image(q1,0,0)
  mmf.image(q2,a,0)
  mmf.image(q3,a,a)
  mmf.image(q4,0,a)

  q1.remove();
  q2.remove();
  q3.remove();
  q4.remove();
}

function change_it() {
  var dx = pmouseX - mouseX
  var dy = mouseY - pmouseY
  if ( abs(dx)>abs(dy)) {
    // this is a slide
    if (dx>0) {
      //to the next page
      symm_pick++;
      if (symm_pick > 6) {
        symm_pick = 0;
      }
    } else {
      //to the previous page
      symm_pick--;
      if (symm_pick < 0) {
        symm_pick = 6;
      }
    }
  } else {
    //this is a scroll
    mf = mmf.resize(a,a)
    create_metamotif()
  }
  draw(); 
}

function draw() {
  create_metamotif();
  for (let c = 0; c < cmax; c++) {
    for (let r = 0; r < rmax; r++) {
      image(mmf,c*2*a,r*2*a);
    }    
  }
}