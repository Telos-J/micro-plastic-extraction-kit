class Reagent {
    constructor(name, color, detection) {
        this.name = name;
        this.create(color);
        this.detection = detection;
    }

    create(color) {
        const object = document.createElement('object');
        object.setAttribute("data", "assets/svg/testTube.svg");
        object.setAttribute("type", "image/svg+xml");
        document.querySelector("#test-tubes").appendChild(object);

        object.addEventListener('load', () => {
            this.svg = object.contentDocument.querySelector('svg');
            this.liquid = this.svg.querySelector('#liquid');
            this.setColor(color);
            this.animate();
            this.setY(200);
        })
    }

    setColor(color) {
        this.color = color;
        this.liquid.setAttribute("fill", color)
    }

    setY(y) {
        gsap.to(this.liquid, {
            y: -y,
        });
    }

    animate() {
        gsap.to(this.liquid, {
            x: '-=200',
            ease: Linear.easeNone,
            repeat: -1
        });
    }
}

const thymolBlue = new Reagent("Thymol Blue", "#A87A21", 0.4);
const methylOrange = new Reagent("Meathyl Orange", "orange", 0.4);
const wrightStein = new Reagent("Wright Stein", "blue", 0.8);
const btb = new Reagent("Bromothymol Blue", "green", 0.9);
const ppt = new Reagent("Phenolphthalein", "white", 0.2);
const phenolRed = new Reagent("Phenol Red", "red", 0.3);

class Liquid {
    constructor(min, max) {
        this.numMicroPlastic = Math.floor((max - min) * Math.random() + min);
        this.visibileMicroPlastic = 0;
        this.create()
    }

    addReagent(reagent) {
        this.visibileMicroPlastic = Math.floor(this.numMicroPlastic * reagent.detection);
    }

    create() {
        const object = document.createElement('object');
        object.setAttribute("data", "assets/svg/petriDish.svg");
        object.setAttribute("type", "image/svg+xml");
        document.querySelector("#petri-dishes").appendChild(object);
    }
}

const tabWater = new Liquid(40, 50);
const barleyTea = new Liquid(15, 25);
const distilledWater = new Liquid(5, 8);

const liquids = [tabWater, barleyTea, distilledWater];

console.log(tabWater.numMicroPlastic, barleyTea.numMicroPlastic, distilledWater.numMicroPlastic)

for (let liquid of liquids) {
    liquid.addReagent(btb)
}

console.log(tabWater.visibileMicroPlastic, barleyTea.visibileMicroPlastic, distilledWater.visibileMicroPlastic)










