class Reagent {
    constructor(name, color) {
        this.name = name;
        this.create(color); 
    }
    create(color) {
        const object = document.createElement('object');
        object.setAttribute("data", "assets/svg/testTube.svg");
        object.setAttribute("type", "image/svg+xml");
        document.querySelector("#test-tubes").appendChild(object); 
    object.addEventListener('load', () => {
        this.svg = object.contentDocument.querySelector('svg')
        this.liquid = this.svg.querySelector('#liquid');
        this.setColor(color) 
        this.animate();
        this.setY(200);  
    })
    }
    setColor(color) {
        this.color = color; 
        this.liquid.setAttribute("fill", color)
    }
    setY(y) {
        gsap.to(this.liquid,{
            y: -y
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

const thymolBlue = new Reagent("Thymol Blue", "#A87A21");
const methylOrange = new Reagent("Meathyl Orange", "red");
const wrightstein = new Reagent ("Wright Stein", "blue")

//document.body.innerHTML = thymolBlue.color;