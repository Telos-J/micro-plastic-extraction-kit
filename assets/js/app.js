class Reagent {
    constructor(name, color, detection) {
        this.name = name;
        this.color = color;
        this.create(color);
        this.detection = detection;
    }

    create(color) {
        const object = document.createElement('object');
        object.setAttribute("data", "assets/svg/testTube.svg");
        object.setAttribute("type", "image/svg+xml");
        document.querySelector("#test-tubes").appendChild(object);

        object.addEventListener('load', () => {
            this.object = object
            this.svg = object.contentDocument.querySelector('svg');
            this.liquid = this.svg.querySelector('#liquid');
            this.setColor(color);
            this.animate();
            this.setY(300);
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

class PetryDish {
    constructor(min, max) {
        this.numMicroPlastic = Math.floor((max - min) * Math.random() + min);
        this.microPlastics = []
        this.visibileMicroPlastic = 0;
        this.create()
    }

    addReagent(reagent) {
        this.visibileMicroPlastic = Math.floor(this.numMicroPlastic * reagent.detection);
        for (const microPlastic of this.microPlastics)
        if (Math.random() < reagent.detection) gsap.to(microPlastic, { opacity : 1})
        else gsap.to(microPlastic, { opacity : 0})
    }

    create() {
        const object = document.createElement('object');
        object.setAttribute("data", "assets/svg/petriDish.svg");
        object.setAttribute("type", "image/svg+xml");
        document.querySelector("#petri-dishes").appendChild(object);

        object.addEventListener('load', () => {
            this.object = object
            this.svg = object.contentDocument.querySelector('svg');
            this.liquid = this.svg.querySelector('#liquid');
            
            const microPlastic = this.svg.querySelector('#micro-plastic')
            
            for (let i = 0; i < this.numMicroPlastic; i++) {
                const microPlasticClone = microPlastic.cloneNode(true)
                this.svg.insertBefore(microPlasticClone, microPlastic)
                this.setMicroPlastic(microPlasticClone)
            }
            this.setMicroPlastic(microPlastic)
        })
    }
    setMicroPlastic(microPlastic) {
        const r = Math.random() * 85 
        const rotation = Math.random() * Math.PI * 2
        gsap.set(microPlastic, { x: `+=${r * Math.cos(rotation)} `, y : `+=${r * Math.sin(rotation)}`})
        this.microPlastics.push(microPlastic)
    }
}

const tabWater = new PetryDish(40, 50);
const barleyTea = new PetryDish(15, 25);
const distilledWater = new PetryDish(5, 8);

const reagents = [thymolBlue, methylOrange, wrightStein, btb, ppt, phenolRed]
const petryDishes = [tabWater, barleyTea, distilledWater] 

addEventListener('mousemove', e => {
    if (!pipette.active) gsap.set(pipette, { x: e.clientX, y: e.clientY, rotate: 0 })
})

addEventListener('click', e => {
    if (!pipette.full)
        for (const reagent of reagents) {
            const rect1 = reagent.object.getBoundingClientRect()
            const rect2 = pipette.getBoundingClientRect()
            const liquid = pipette.contentDocument.querySelector('#liquid');

            if (AABB(rect1, rect2)) {
                pipette.active = true
                gsap.timeline()
                    .set(liquid, { attr: { fill: reagent.color } })
                    .to(pipette, 0.2, { x: (rect1.left + rect1.right) / 2, y: rect1.top, rotate: -45 })
                    .to(liquid, {
                        attr: { y: 113 }, onComplete: () => {
                            pipette.active = false
                            pipette.full = true
                            pipette.reagent = reagent
                        }
                    })
            }
        }
    else
        for (const petryDish of petryDishes) {
            const rect1 = petryDish.object.getBoundingClientRect()
            const rect2 = pipette.getBoundingClientRect()
            const pipetteLiquid = pipette.contentDocument.querySelector('#liquid');

            if (AABB(rect1, rect2)) {
                pipette.active = true
                gsap.timeline()
                    .to(pipette, 0.2, { x: (rect1.left + rect1.right + rect2.width) / 2, y: (rect1.top + rect1.bottom - rect2.height) / 2 })
                    .to(pipetteLiquid, {
                        attr: { y: 283 }, onComplete: () => {
                            pipette.active = false
                            pipette.full = false
                            petryDish.addReagent(pipette.reagent)
                        }
                    }, 0.2)
                    .to(petryDish.liquid, { attr: { fill: pipetteLiquid.getAttribute('fill') } }, 0.2)
            }
        }
})

function AABB(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width / 2 &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y + rect2.height / 2
}

