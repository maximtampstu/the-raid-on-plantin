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

const phoneBar = (scrolled) => {
  const canvas = document.querySelector(".phone-button__progress");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(28, 28, 25, 1.5 * Math.PI, 1.5 * Math.PI + (2 * Math.PI * (scrolled / 100)));
  ctx.lineWidth = 12;
  ctx.strokeStyle = "#E8E0D3";
  ctx.stroke();

}

const progressBar = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  phoneBar(scrolled)
}

const nav = () => {
  navInteraction();
  document.addEventListener("scroll", progressBar);
}

const appearEffect = (itemClass, showPercent) => {
  const appearItems = document.querySelectorAll(itemClass);
  appearItems.forEach(item => {
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
  nav();
  letterMother();
  appearEffect(".appear", 85);
}

init();