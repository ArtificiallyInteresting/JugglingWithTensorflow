class environment{

  constructor(height, width) {
    this.height = height;
    this.width = width;
    //todo Should these paddles be an object? The balls? It's fine for now
    this.leftPaddle = [100,200, 0, 0];//x, y, dx, dy
    this.rightPaddle = [400,200, 0, 0];//x, y, dx, dy
    this.paddleLength = 20;
    this.balls = [[100,100,1,1]]; //x, y, dx, dy
    this.ballRadius = 5;
    this.gravityPerStep = .01;
    this.leftController = new humanController();
    this.rightController = new humanController();
    this.maxSpeed = 2;
    this.bounce = 1.1;
  }

  step() {
      var ballOutOfBounds = false;
      this.balls.forEach((value, index, array) => {
          value[0] += value[2]; //horizontal motion
          value[1] += value[3]; //vertical motion
          value[3] += this.gravityPerStep; //gravity

          if (value[0] < 0 || value[0] >= this.width || value[1] < 0 || value[1] >= this.height) {
              ballOutOfBounds = true;
          }
      });
      if (ballOutOfBounds) {
          return false; 
      }

      var leftMove = this.leftController.getMove(this);
      if (leftMove != undefined) {
          this.leftPaddle[2] += leftMove[0];
          this.leftPaddle[3] += leftMove[1];
      }
      var rightMove = this.rightController.getMove(this);
      if (rightMove != undefined) {
          this.rightPaddle[2] += rightMove[0];
          this.rightPaddle[3] += rightMove[1];
      }

      if (this.leftPaddle[2] > this.maxSpeed) {
          this.leftPaddle[2] = this.maxSpeed;
      }
      if (this.leftPaddle[2] < -1 * this.maxSpeed) {
          this.leftPaddle[2] = -1 * this.maxSpeed;
      }
      if (this.leftPaddle[3] > this.maxSpeed) {
          this.leftPaddle[3] = this.maxSpeed;
      }
      if (this.leftPaddle[3] < -1 * this.maxSpeed) {
          this.leftPaddle[3] = -1 * this.maxSpeed;
      }
      if (this.rightPaddle[2] > this.maxSpeed) {
          this.rightPaddle[2] = this.maxSpeed;
      }
      if (this.rightPaddle[2] < -1 * this.maxSpeed) {
          this.rightPaddle[2] = -1 * this.maxSpeed;
      }
      if (this.rightPaddle[3] > this.maxSpeed) {
          this.rightPaddle[3] = this.maxSpeed;
      }
      if (this.rightPaddle[3] < -1 * this.maxSpeed) {
          this.rightPaddle[3] = -1 * this.maxSpeed;
      }
      this.leftPaddle[0] += this.leftPaddle[2];
      this.leftPaddle[1] += this.leftPaddle[3];
      this.rightPaddle[0] += this.rightPaddle[2];
      this.rightPaddle[1] += this.rightPaddle[3];
      this.handleCollisions();
      return true;
  }

  handleCollisions() {
    this.balls.forEach((ball) => {
        if (this.isIntersecting(this.leftPaddle, ball)) {
            this.handleIntersection(this.leftPaddle, ball);
        }
    });
    // this.balls.forEach((ball) => {
    //     if (this.isIntersecting(this.rightPaddle, ball)) {
    //         this.handleIntersection(this.rightPaddle, ball);
    //     }
    // });
  }

  handleIntersection(paddle, ball) {
    ball[2] = paddle[2] * this.bounce;
    ball[3] = paddle[3] * this.bounce;
  }
    //Todo This is really crappy collision detection. The math at the bottom doesn't work because it only counts y.
    isIntersecting(paddle, ball) {
      var y = paddle[1];
      var x1 = paddle[0];
      var x2 = paddle[0] + this.paddleLength/2;
      var x3 = paddle[0] + this.paddleLength;
      var ballX = ball[0];
      var ballY = ball[1];
      if (Math.sqrt(Math.pow(ballX - x1, 2) + Math.pow(ballY - y, 2)) < this.ballRadius) {
          return true;
      }
      if (Math.sqrt(Math.pow(ballX - x2, 2) + Math.pow(ballY - y, 2)) < this.ballRadius) {
          return true;
      }
      if (Math.sqrt(Math.pow(ballX - x3, 2) + Math.pow(ballY - y, 2)) < this.ballRadius) {
          return true;
      }
      return false;


        // var x1 = paddle[0];
        // var y1 = paddle[1];
        // var x2 = paddle[1] + this.paddleLength;
        // var y2 = paddle[1];
        // var line = new Victor(x2 - x1, y2 - y1);
        // var edgeNormal = line.rotate(Math.PI * -0.5);
        // //calculating line's perpendicular distance to ball
        // var normal = new Victor(ball[0] - x1, ball[1] - y1);
        // var projection = normal.projectOnto(edgeNormal);
        // console.log(projection.length());
        // if (projection.length() <= this.ballRadius) {
        //     return true;
        // }
        // return false;
  }
}