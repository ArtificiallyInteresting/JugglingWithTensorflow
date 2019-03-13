class main {

    constructor() {
        self.env = new environment(600, 800);
        self.this = this;
    }

    loop(timestamp) {
        env.step();
        draw(env);
        self.lastRender = timestamp;
        window.requestAnimationFrame(self.this.loop);
    };
}
localMain = new main();
window.requestAnimationFrame(localMain.loop);