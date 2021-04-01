window.addEventListener('load', () => {
    const testTubeObject = document.querySelector('#test-tube');
    const testTubeSVG = testTubeObject.contentDocument;
    const liquid = testTubeSVG.querySelector('#liquid');

    liquid.setAttribute('fill', 'red');

    gsap.to(liquid, {
        y: -200,
    });
    gsap.to(liquid, {
        x: '-=200',
        ease: Linear.easeNone,
        repeat: -1
    });
})
