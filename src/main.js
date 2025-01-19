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
/*
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
*/
const navInteraction = () => {

  const $navButton = document.querySelector('.phone-button');
  const $navList = document.querySelector('.nav__list');
  const listItems = $navList.querySelectorAll("li");
  const $closeButton = document.querySelector('.nav__item--my-beginning button')
  
  $navButton.classList.remove('visually-hidden');
  $navList.classList.add("visually-hidden");
  
  const openNavigation = () => {
    $navList.classList.remove("visually-hidden");
    $navButton.classList.add('visually-hidden');
  }
  
  const closeNavigation = () => {
    $navList.classList.add("visually-hidden");
    $navButton.classList.remove('visually-hidden');
  }
  
  $navButton.addEventListener("click", openNavigation);
  $closeButton.addEventListener("click", closeNavigation);
  listItems.forEach(item => {
    item.addEventListener('click', () => {
      const link = item.querySelector('a');
  
      if (link.getAttribute('href') !== '#' && link.getAttribute('href') !== "") {
        closeNavigation();
      }
    });
  });

}

const appearEffect = (itemClass, showPercent) => {
  const appearItems = document.querySelectorAll(itemClass);
  console.log(appearItems)
  appearItems.forEach(item => {
    console.log(item.className)
    gsap.set(item, { opacity: 0 })
    gsap.to(item, {
      opacity: 1,
      duration: 2,
      scrollTrigger: {
        trigger: item,
        start: `top ${showPercent}%`,
      }
    });
  });
}

const letterMother = () => {

  const $letterButton = document.querySelector('.letter-button');
  const $letter = document.querySelector('.letter-container');
  const $closeButton = document.querySelector('.letter-container button')

  const $navButton = document.querySelector('.phone-button');

  $letterButton.classList.remove('visually-hidden');
  $letter.classList.add("visually-hidden");

  const openNavigation = () => {
    $letter.classList.remove("visually-hidden");
    $navButton.classList.add('visually-hidden');
  }

  const closeNavigation = () => {
    $letter.classList.add("visually-hidden");
    $navButton.classList.remove('visually-hidden');
  }

  $letterButton.addEventListener("click", openNavigation);
  $closeButton.addEventListener("click", closeNavigation);

}

const init = () => {
  navInteraction();
  letterMother();
  appearEffect(".appear", 85);
}

init();