class humanController {

    constructor() {
        window.addEventListener('keydown',(event => {this.setKeys(event);}),false);
        this.keyPressed = undefined;
        this.strength = .05;
    }
    setKeys(event) {
        var code = event.keyCode;
        this.keyPressed = code;
        return true;
    }
    getMove(env) {
        if (this.keyPressed == undefined) {
            //do nothing.
        }
        else if (this.keyPressed == 87) { //up
            return [0,-this.strength];
        }
        else if (this.keyPressed == 83) { //down
            return [0,this.strength];
        }
        else if (this.keyPressed == 65) { //left
            return [-this.strength,0];
        }
        else if (this.keyPressed == 68) { //right
            return [this.strength,0];
        }
        this.keyPressed = undefined;
    }
}