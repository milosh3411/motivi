class Button {
  constructor(x, y, r, str) {
    this.pressed = false;
    this.text = str;
    this.active = false;
    this.x = x;
    this.y = y;
    this.r = r;
  }
  drawMe() {
    if (this.active) {
      noStroke();
      if (this.pressed) {
        fill(BRIGHT + 30, 100);
      } else {
        fill(BRIGHT, 100);
      }
    } else {
      noStroke();
      fill(DARK, 100);
    }
    ellipse(this.x, this.y, this.r, this.r);
    fill(255);
    textAlign(CENTER);
    text(this.text, this.x, this.y);
  }
  is_pressed(x, y) {
    if ((dist(this.x, this.y, x, y) < this.r) && (this.active == true)) {
      this.pressed = true;
      return true;
    } else {
      this.pressed = false;
      return false;
    }
  }
}
