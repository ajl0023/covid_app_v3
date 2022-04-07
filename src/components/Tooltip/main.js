export function HandleMouse(tooltip) {
  this.mouse_pos = {
    x: 0,
    y: 0,
  };
  this.onMouseMove = function (e) {
    this.mouse_pos.x = e.pageX;
    this.mouse_pos.y = e.pageY;
    if (tooltip) {
      this.setCoords();
    }
  };
  this.setCoords = function (e) {
    tooltip.style.left = `${this.mouse_pos.x + 40}px`;
    tooltip.style.top = `${this.mouse_pos.y}px`;
  };
}
