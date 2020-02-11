const ball = document.querySelector('.ball'),
    btn = document.querySelector('.btn-active'),
    spring = document.querySelector('.spring'),
    fill = document.querySelector('.fill');

const stretchSpring = () => {
    fill.style.animationName = 'fill';

    fill.style.animationPlayState = 'running';
    spring.style.animationPlayState = 'running';
    btn.textContent = 'Release spring';

    btn.removeEventListener('mousedown', stretchSpring);
    btn.removeEventListener('touchstart', stretchSpring);
}

const releaseSpring = () => {
    const fillWidth = parseInt(getComputedStyle(fill).width, 10);
    const barWidth = parseInt(getComputedStyle(document.querySelector('.bar')).width, 10);
    let powerPercent = (fillWidth / barWidth).toFixed(2);

    btn.style.color = 'black';
    btn.textContent = `Impact power: ${(powerPercent * 100).toFixed()}%`;

    fill.style.animationPlayState = 'paused';

    // document.documentElement.style.setProperty('--power-x', `${40 + powerPercent * 50}%`);
    ball.style.animation = 'fly-ball-x 1s 1 forwards .15s cubic-bezier(.17, .67, .6, 1), fly-ball-y 1s 1 forwards .15s linear';

    document.documentElement.style.setProperty('--spring-left', getComputedStyle(spring).left);
    spring.style.animation = 'release-spring .2s 1 forwards linear';

    btn.removeEventListener('mouseup', releaseSpring);
    btn.removeEventListener('touchend', releaseSpring);

    ball.addEventListener('animationend', resetAnimation);

    //alternative to using native variables for animations
    const myRules = document.styleSheets[0].cssRules;
    for (const i of myRules) {
        if (i.name === 'fly-ball-x') {
            i.appendRule(`100% {left:${40 + powerPercent * 50}%}`);
        }
    }
}

const resetAnimation = () => {
    ball.removeEventListener('animationend', resetAnimation);

    setTimeout(() => {
        btn.addEventListener('mousedown', stretchSpring);
        btn.addEventListener('mouseup', releaseSpring);
        btn.addEventListener('touchstart', stretchSpring);
        btn.addEventListener('touchend', releaseSpring);

        btn.style.color = 'white';
        btn.textContent = 'pull the spring';

        spring.style.animation = '';
        ball.style.animation = '';
        fill.style.animationName = 'none';
    }, 2000);
}

btn.addEventListener('mousedown', stretchSpring);
btn.addEventListener('mouseup', releaseSpring);
btn.addEventListener('touchstart', stretchSpring);
btn.addEventListener('touchend', releaseSpring);