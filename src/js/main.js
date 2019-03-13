class main {

    constructor() {
        this.env = new environment(600, 800);
    }

    loop(timestamp) {
        var success = this.env.step();
        if (!success) {
            this.env = new environment(600, 800);
        }
        draw(this.env);
        this.lastRender = timestamp;
        window.requestAnimationFrame(timeStep);
    };
}

localMain = new main();
function timeStep(timestamp) {
    localMain.loop(timestamp)
}

window.requestAnimationFrame(timeStep);