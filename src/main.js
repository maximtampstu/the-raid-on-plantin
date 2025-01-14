/*
import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
*/

gsap.registerPlugin(ScrollTrigger);

const appearEffect = (itemClass, showPercent) => {  
  const appearItems = document.querySelectorAll(itemClass);
  console.log(appearItems)
  appearItems.forEach(item => {
    console.log(item.className)
    gsap.set(item, { opacity: 0 })
    gsap.to(item, {
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: item,
        start: `top ${showPercent}%`,
      }
    });
  });
}

const init = () => {
  appearEffect(".appear", 85);
  appearEffect(".appear-later", 35);
};

init();