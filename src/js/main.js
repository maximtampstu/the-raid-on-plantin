import '../css/reset.css'
import '../css/style.css'


gsap.registerPlugin(ScrollTrigger);

const sizeCheck = () => {
  let mq = gsap.matchMedia();

  mq.add("(min-width: 1160px)", () => {
    navDesktop();
    console.log(mq);
  });

  mq.add("(max-width: 1159px)", () => {
    navPhone();
    console.log(mq);
  });

}

const navPhone = () => {

  const $navButton = document.querySelector('.phone-button');
  const $navList = document.querySelector('.nav__list');
  const $navContainer = document.querySelector('.nav')
  const listItems = $navList.querySelectorAll("li");
  const $closeButton = document.querySelector('.nav__item--my-beginning button');
  const $header = document.querySelector(".header");
  const $body = document.querySelector('body');

  $navButton.classList.remove('visually-hidden');
  $navContainer.classList.add("visually-hidden");
  $header.style.top = "0px";

  const openNavigation = () => {
    $navContainer.classList.remove("visually-hidden");
    $navButton.classList.add('visually-hidden');
    $body.classList.add('no-scroll');
    console.log("open phone")
  }

  const closeNavigation = () => {
    $navContainer.classList.add("visually-hidden");
    $navButton.classList.remove('visually-hidden');
    $body.classList.remove('no-scroll');
    console.log("close phone")
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
  
  window.addEventListener('click', (e) => {
    if ($navButton.classList.contains("visually-hidden")){
      if (!$navList.contains(e.target) && !$navButton.contains(e.target)) {
        closeNavigation();
      }
    }
  });

}

const navDesktop = () => {
  const $navButton = document.querySelector(".desktop-button");
  const $navContainer = document.querySelector(".header");
  const $logo = document.querySelector(".header__logo");
  const $navList = document.querySelector('.nav__list');
  const $arrowUp = document.querySelector('.desktop-button__arrow--up');
  const $arrowDown = document.querySelector('.desktop-button__arrow--down');

  $navContainer.style.top = "0px";
  $logo.style.opacity = 1;
  $navList.classList.remove("visually-hidden");
  $arrowUp.setAttribute('opacity', 1);
  $arrowDown.setAttribute('opacity', 0);

  const toggleNavigation = () => {
    console.log("toggle desktop")
    if ($navContainer.style.top === "0px") {
      $navContainer.style.top = "-65px";
      $logo.style.opacity = 0;
      $arrowUp.setAttribute('opacity', 0);
      $arrowDown.setAttribute('opacity', 1);
    } else {
      $navContainer.style.top = "0px";
      $logo.style.opacity = 1;
      $arrowUp.setAttribute('opacity', 1);
      $arrowDown.setAttribute('opacity', 0);
    }
  }

  $navButton.addEventListener("click", toggleNavigation);
}

const barPhone = (scrolled) => {
  const canvas = document.querySelector(".phone-button__progress");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(28, 28, 25, 1.5 * Math.PI, 1.5 * Math.PI + (2 * Math.PI * (scrolled / 100)));
  ctx.lineWidth = 12;
  ctx.strokeStyle = "#E8E0D3";
  ctx.stroke();

}

const barDesktop = (scrolled) => {
  document.querySelector(".desktop-progress").style.width = scrolled + "%";
}

const progressBar = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  if (window.innerWidth >= 1160) {
    barDesktop(scrolled)
  } else {
    barPhone(scrolled)
  }
}

const nav = () => {
  sizeCheck();

  document.addEventListener("scroll", progressBar);
}

const appearEffect = (itemClass, showPercent, appearOpacity) => {
  const appearItems = document.querySelectorAll(itemClass);
  appearItems.forEach(item => {
    gsap.set(item, { opacity: 0 })
    gsap.to(item, {
      opacity: appearOpacity,
      duration: 2,
      scrollTrigger: {
        trigger: item,
        start: `top ${showPercent}%`,
      }
    });
  });
}

const appear = () => {
  appearEffect(".appear", 85, "100%");
  appearEffect(".appear-late", 40, "100%");
  appearEffect(".appear-80", 85, "80%");
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




const binding = () => {
  const topList = document.querySelector(".bookbind__list--top ul");
  console.log(Math.floor(topList.offsetWidth / 80))
  for (let i = 0; i < Math.floor(topList.offsetWidth / 80); i++) {
    const circle = document.createElement("li")
    circle.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16.3334" cy="16" r="16" fill="#232321"/>
      </svg>`
    topList.appendChild(circle);
  }
}



const moving = (e) => {
  element.style.top = `${e.pageY - element.offsetWidth / 2}px`;
  element.style.left = `${e.pageX - element.offsetWidth / 2}px`;
}
const element = document.createElement("img");

const test = (e) => {
  element.src = "src/image/blueprint-living.png"
  element.style.position = "absolute";
  element.style.width = "5.75rem";
  element.draggable = false;
  element.style.top = `${e.pageY - element.offsetWidth / 2}px`;
  element.style.left = `${e.pageX - element.offsetWidth / 2}px`;

  document.querySelector(".blueprint__game").appendChild(element)
}

const upl = () => {
  document.querySelector(".blueprint__game").removeChild(element)
}

const blueprint = () => {
  document.querySelector(".blueprint__living--item").addEventListener("mousedown", test)
  document.addEventListener("mousemove", moving)
  document.addEventListener("mouseup", upl)
}

const startCorrector = () => {
  const $screen1 = document.querySelector(".corrector__screen--1");
  const $screen2 = document.querySelector(".corrector__screen--2");

  $screen2.classList.remove("visually-hidden");
  $screen1.classList.add('visually-hidden');
}

const againCorrector = () => {
  const $screen2 = document.querySelector(".corrector__screen--2");
  const $screen3 = document.querySelector(".corrector__screen--3");

  document.querySelector(".corrector__points").textContent = 0;
  document.querySelectorAll(".corrector__mistake").forEach(mistake => {
    mistake.style.color = "var(--color-black)";
  });

  $screen2.classList.remove("visually-hidden");
  $screen3.classList.add('visually-hidden');
}


const corrector = () => {
  const $screen1 = document.querySelector(".corrector__screen--1");
  $screen1.classList.remove('visually-hidden');

  const $screen2 = document.querySelector(".corrector__screen--2");
  $screen2.classList.add('visually-hidden');

  const $screen3 = document.querySelector(".corrector__screen--3");
  $screen3.classList.add('visually-hidden');

  document.querySelector(".corrector__start").addEventListener("click", startCorrector)

  document.querySelectorAll(".corrector__mistake").forEach(mistake => {
    mistake.addEventListener("click", () => {
      if (mistake.style.color != "var(--color-red)") {
        mistake.style.color = "var(--color-red)";

        const scoreTag = document.querySelector(".corrector__points")
        let score = parseInt(scoreTag.textContent, 10);
        score++
        scoreTag.textContent = score;

        if (score >= 5) {
          $screen3.classList.remove("visually-hidden");
          $screen2.classList.add('visually-hidden');
        }
      }
    })
  });
  document.querySelector(".corrector__again").addEventListener("click", againCorrector)


}

const cliffMask = (maskClass, maskSize, maskContainer, maskStart, maskEnd) => {
  const mask = document.querySelector(maskClass);

  ScrollTrigger.create({
    trigger: maskContainer,
    start: `top ${maskStart}`,
    end: `bottom ${maskEnd}`,
    onEnter: () => mask.classList.add("mask__active"),
    onLeave: () => mask.classList.remove("mask__active"),
    onEnterBack: () => mask.classList.add("mask__active"),
    onLeaveBack: () => mask.classList.remove("mask__active"),
  });

  gsap.to(mask, {
    maskImage: `radial-gradient(circle, transparent ${maskSize}%, black ${maskSize + 2}%)`,
    webkitMaskImage: `radial-gradient(circle, transparent ${maskSize}%, black ${maskSize + 2}%)`,
    scrollTrigger: {
      trigger: maskContainer,
      start: `top ${maskStart}`,
      end: `bottom ${maskEnd}`,
      scrub: true,
      //markers: true,
    },
  });
}

const cliffSound = (soundContainer, soundPath) => {
  const sound = new Audio(`${import.meta.env.BASE_URL}sounds/${soundPath}`);

  ScrollTrigger.create({
    trigger: soundContainer,
    start: "top 40%",
    onEnter: () => {
      sound.play();
    },
  });
}

const cliff = () => {
  cliffMask(".cliff__mask--1", 50, ".cliff__list--1", "bottom", "top")
  cliffMask(".cliff__mask--2", 15, ".cliff__list--2", "bottom", "top")
  cliffMask(".cliff__mask--3", -5, ".cliff__list--3", "bottom", "top")

  cliffSound(".cliff__text-4", "knocking.mp3")
  cliffSound(".cliff__text-6", "invation.wav")
  cliffSound(".cliff__text-8", "steps.mp3")

  gsap.set(".cta__text", { x: window.innerWidth, opacity: 0 })
  gsap.to(".cta__text", {
    x: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: ".cta",
      scrub: true,
      //pin: ".cta__text",
      start: "top 75%",
      end: "top 25%",
      //markers: true,
    },
  });
}

const init = () => {
  nav();
  letterMother();
  appear(); //DONE
  //binding();
  //blueprint();
  corrector(); //DONE
  cliff(); //DONE

}

init();