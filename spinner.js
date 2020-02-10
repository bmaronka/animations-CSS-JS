const spinner = document.querySelector('.v2');

const fps = (1000 / 60).toFixed(2);
let deg = 0;
const degChange = 6;

const rotate = () => {
    deg += degChange;
    spinner.style.transform = `rotate(${deg}deg)`;

    setTimeout(rotate, fps);
}

rotate();


const spinnerRAF = document.querySelector('.v3');

let degRAF = 0;
const degChangeRAF = 6;

const rotateRAF = () => {
    degRAF += degChangeRAF;
    spinnerRAF.style.transform = `rotate(${degRAF}deg)`;
    requestAnimationFrame(rotateRAF)
}

rotateRAF();

const spinnerRAFNext = document.querySelector('.v4');

let degRAFNext = 0;
const degChangeRAFNext = 6;
let time = performance.now();
// console.log(time);

const rotateRAFNext = (currentTime) => {
    if (currentTime - time > 16) { //protection against for example too fast animation display on the monitors with 120Hz refrash rate
        // console.log(currentTime);
        time = currentTime;
        degRAFNext += degChangeRAFNext;
        spinnerRAFNext.style.transform = `rotate(${degRAFNext}deg)`;
    }

    requestAnimationFrame(rotateRAFNext)
}

rotateRAFNext();