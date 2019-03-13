class environment{

  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.leftPaddle = [100,200];
    this.rightPaddle = [400,200];
    this.paddleLength = 20;
    this.balls = [[100,100,1,1]]; //x, y, dx, dy
    this.ballRadius = 5;
    this.gravityPerStep = .1;
  }

  step() {
      this.balls.forEach((value, index, array) => {
          value[0] += value[2]; //horizontal motion
          value[1] += value[3]; //vertical motion
          value[3] += this.gravityPerStep //gravity
      })
  }
}