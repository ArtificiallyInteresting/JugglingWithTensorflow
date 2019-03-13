function draw(env) {
    var canvas = $("#mainCanvas")[0];
    var ctx = canvas.getContext("2d"); //todo grab this once and cache it.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(env.leftPaddle[0], env.leftPaddle[1]);
    ctx.lineTo(env.leftPaddle[0] + env.paddleLength, env.leftPaddle[1]);
    ctx.moveTo(env.rightPaddle[0], env.rightPaddle[1]);
    ctx.lineTo(env.rightPaddle[0] + env.paddleLength, env.rightPaddle[1]);
    ctx.stroke();

    env.balls.forEach((value, index, array) => {
        ctx.moveTo(value[0] + env.ballRadius, value[1]); //todo pretty bad hack. Why do I need to move before drawing a circle?
        ctx.arc(value[0], value[1], env.ballRadius, 0, 2 * Math.PI);
    });
    ctx.stroke();
    ctx.font = "20px Georgia";
    ctx.fillText("Score: " + env.framesSurvived, 10, 550);
}