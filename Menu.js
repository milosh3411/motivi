class Menu {
  constructor() {
    this.button = [];
  }
  button_pressed(x, y) {
    for (b = 0; b < this.button.length; b++) {
      if (this.button[b].is_pressed(x, y)) {
        return b;
      }
    }
    return null;
  }
  drawMenu() {
    for (b = 0; b < this.button.length; b++) {
      this.button[b].drawMe();
    }
  }
}