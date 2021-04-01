class Reagent {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}

const thymolBlue = new Reagent("Thymol Blue", "reddish-brown");
const methylOrange = new Reagent("Meathyl Orange", "red");

document.body.innerHTML = thymolBlue.color;