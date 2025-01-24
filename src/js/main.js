import '../css/reset.css';
import '../css/style.css';
import { DotLottie } from '@lottiefiles/dotlottie-web';
//import { disablePageScroll, enablePageScroll } from 'scroll-lock';


gsap.registerPlugin(ScrollTrigger);

let pageHeight = document.body.scrollHeight;
let lock1 = 0;
let lock2 = 0;

document.querySelector(".lock--1").classList.add("visually-hidden");
document.querySelector(".lock--2").classList.add("visually-hidden");

window.addEventListener("resize", () => {
  document.querySelector(".lock--1").classList.remove("visually-hidden");
  document.querySelector(".lock--2").classList.remove("visually-hidden");

  ScrollTrigger.refresh();

  pageHeight = document.body.scrollHeight;

  if (lock1 === 0){
    document.querySelector(".lock--1").classList.add("visually-hidden");
  }
  if(lock2 === 0){
    document.querySelector(".lock--2").classList.add("visually-hidden");
  }



})

/* NAV */

const $body = document.querySelector('body');
const $header = document.querySelector(".header");
const $navContainer = document.querySelector('.nav')
const $navList = document.querySelector('.nav__list');
const listItems = $navList.querySelectorAll("li");
const $navButtonDesktop = document.querySelector(".desktop-button");
const $navButtonPhone = document.querySelector('.phone-button');
const $closeButtonPhone = document.querySelector('.nav__item--my-beginning button');
const $logo = document.querySelector(".header__logo");
const $arrowUp = document.querySelector('.desktop-button__arrow--up');
const $arrowDown = document.querySelector('.desktop-button__arrow--down');

const navPhone = () => {
  $navButtonPhone.classList.remove('visually-hidden');
  $navContainer.classList.add("visually-hidden");
  $header.style.top = "0px";
}

const navDesktop = () => {
  $header.style.top = "0px";
  $logo.style.opacity = 1;
  $navList.classList.remove("visually-hidden");
  $arrowUp.setAttribute('opacity', 1);
  $arrowDown.setAttribute('opacity', 0);
}

const nav = () => {
  let mq = gsap.matchMedia();

  mq.add("(min-width: 1160px)", () => {
    navDesktop();
  });

  mq.add("(max-width: 1159px)", () => {
    navPhone();
  });
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
  const height = pageHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  if (window.innerWidth >= 1160) {
    barDesktop(scrolled)
  } else {
    barPhone(scrolled)
  }
}

const toggleNavigationDesktop = () => {
  if ($header.style.top === "0px") {
    $header.style.top = "-65px";
    $logo.style.opacity = 0;
    $arrowUp.setAttribute('opacity', 0);
    $arrowDown.setAttribute('opacity', 1);
  } else {
    $header.style.top = "0px";
    $logo.style.opacity = 1;
    $arrowUp.setAttribute('opacity', 1);
    $arrowDown.setAttribute('opacity', 0);
  }
}

const openNavigationPhone = () => {
  $navContainer.classList.remove("visually-hidden");
  $navButtonPhone.classList.add('visually-hidden');
  $body.classList.add('no-scroll');
}

const closeNavigationPhone = () => {
  $navContainer.classList.add("visually-hidden");
  $navButtonPhone.classList.remove('visually-hidden');
  $body.classList.remove('no-scroll');
}

document.addEventListener("scroll", progressBar);
$navButtonDesktop.addEventListener("click", toggleNavigationDesktop);
$navButtonPhone.addEventListener("click", openNavigationPhone);
$closeButtonPhone.addEventListener("click", closeNavigationPhone);

listItems.forEach(item => {
  item.addEventListener('click', () => {
    const link = item.querySelector('a');
    if (link.classList.contains("nav__active")) {
      closeNavigationPhone();
    }
  });
});

document.addEventListener('click', (e) => {
  if ($navButtonPhone.classList.contains("visually-hidden")) {
    if (!$navList.contains(e.target) && !$navButtonPhone.contains(e.target)) {
      closeNavigationPhone();
    }
  }
});



/* APPEAR */

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
        //markers: true,
      }
    });
  });
}

const appear = () => {
  appearEffect(".appear", 85, "100%");
  appearEffect(".appear-late", 40, "100%");
  appearEffect(".appear-80", 85, "80%");
}



/* LETTER MOTHER */

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



/* ENVELOPE */

const envelope = () => {
  const dotLottie = new DotLottie({
    autoplay: false,
    loop: false,
    canvas: document.querySelector("#anim-envelope"),
    src: "./animation/envelope/envelope.json",
    renderConfig: {
      freezeOnOffscreen: false
    }
  });

  document.querySelector(".my-beginning__letter").addEventListener("click", () => {
    dotLottie.play();
  });

  dotLottie.addEventListener("complete", () => {
    document.querySelector(".lock--1").classList.remove("visually-hidden");
    document.querySelector(".my-beginning__letter-container p").innerHTML = "&darr;   Keep on scrolling   &darr;"
    ScrollTrigger.refresh();

    document.querySelector(".nav__link--normandy").classList.remove("nav__locked")
    document.querySelector(".nav__link--normandy").classList.add("nav__active")
    lock1 = 1;

    bindingSetup()
  });
}



/* BINDING */

const canvasBinder = document.querySelector(".bookbind__canvas");
canvasBinder.width = document.querySelector(".bookbind__width").offsetWidth;
const ctxBinder = canvasBinder.getContext("2d");

let binderTopList = [];
let binderBottomList = [];
let bindingComplete = 0;
let mouseX = 0;
let mouseY = 0;
let bindingToConnect = Number.POSITIVE_INFINITY;
let bindsDone = 0;

class BindCircle {
  constructor(xPos, yPos, position) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.position = position
    this.size = 16;
    this.selected = 0;
    this.conected = 0;
    this.xPosTo = 0;
    this.yPosTo = 0;
  }

  display() {
    ctxBinder.beginPath();
    ctxBinder.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI);
    ctxBinder.fillStyle = "#232321";
    ctxBinder.fill();

    if (this.selected === 1) {
      ctxBinder.beginPath();
      ctxBinder.moveTo(this.xPos, this.yPos);
      ctxBinder.lineTo(mouseX, mouseY);

      ctxBinder.lineWidth = 10;
      ctxBinder.strokeStyle = "#232321";
      ctxBinder.stroke();
    }

    if (this.conected === 1) {
      ctxBinder.beginPath();
      ctxBinder.moveTo(this.xPos, this.yPos);
      ctxBinder.lineTo(this.xPosTo, this.yPosTo);

      ctxBinder.lineWidth = 10;
      ctxBinder.strokeStyle = "#232321";
      ctxBinder.stroke();
    }

  }
}

const bindSetTotal = (circleAmount) => {
  if (circleAmount > 4) {
    bindingToConnect = 5;
  } else {
    bindingToConnect = circleAmount;
  }

  if (bindingToConnect === 1) {
    document.querySelector(".bookbind__help").innerHTML = `Make <span class="bookbind__amount">0</span> connection between top and bottom dots.`;
  } else {
    document.querySelector(".bookbind__amount").textContent = bindingToConnect;
  }
}

const bindingSetup = () => {
  let circleAmount = 0;

  if (Math.floor(canvasBinder.width / 100) >= 12) {
    circleAmount = 12;
  } else {
    circleAmount = Math.floor(canvasBinder.width / 100);
  }

  for (let i = 0; i < circleAmount + 1; i++) {
    binderTopList.push(new BindCircle(16 + (i * (canvasBinder.width - 32) / circleAmount), 48, "top"))
    binderBottomList.push(new BindCircle(16 + (i * (canvasBinder.width - 32) / circleAmount), canvasBinder.height - 48, "bottom"))
  }

  bindSetTotal(circleAmount + 1)
}

const bindingDraw = () => {
  ctxBinder.clearRect(0, 0, canvasBinder.width, canvasBinder.height);

  binderTopList.forEach(item => {
    item.display()
  });
  binderBottomList.forEach(item => {
    item.display()
  });

  requestAnimationFrame(bindingDraw)
}

const bindingResize = () => {
  canvasBinder.width = 0;
  canvasBinder.width = document.querySelector(".bookbind__width").offsetWidth;

  binderTopList = [];
  binderBottomList = [];
  bindsDone = 0;

  bindingSetup()
}


const binding = () => {
  bindingSetup()
  bindingDraw()
}

const getCanvasCoordinates = (e) => {
  const rect = canvasBinder.getBoundingClientRect();
  let x, y = 0;

  if (e.touches) {
    if (e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = mouseX;
      y = mouseY;
    }
  } else {
    x = e.offsetX;
    y = e.offsetY;
  }

  mouseX = x;
  mouseY = y;

  return { x, y };
};

const handleMousedownBinding = (e) => {
  const { x, y } = getCanvasCoordinates(e);

  binderTopList.forEach(circle => {
    if (binderTopList.every(circle => circle.selected === 0)) {

    }
    if (circle.conected === 0) {
      if (Math.sqrt(Math.pow(circle.xPos - x, 2) + Math.pow(circle.yPos - y, 2)) < circle.size) {
        circle.selected = 1;
      }
    }
  });
  binderBottomList.forEach(circle => {
    if (circle.conected === 0) {
      if (Math.sqrt(Math.pow(circle.xPos - x, 2) + Math.pow(circle.yPos - y, 2)) < circle.size) {
        circle.selected = 1;
      }
    }
  });

  e.preventDefault();

  window.addEventListener("mouseup", handleMouseupBinding);
  window.addEventListener("touchend", handleMouseupBinding);
  window.addEventListener("mousemove", handleMousemoveBinding);
  window.addEventListener("touchmove", handleMousemoveBinding);
}

const bindCheck = (circleFrom, circleTo, e) => {
  const { x, y } = getCanvasCoordinates(e);

  if (Math.sqrt(Math.pow(circleTo.xPos - x, 2) + Math.pow(circleTo.yPos - y, 2)) < circleTo.size) {
    if (circleTo.conected === 0) {
      circleFrom.conected = 1;
      circleTo.conected = 1;
      circleFrom.xPosTo = circleTo.xPos;
      circleFrom.yPosTo = circleTo.yPos;
      circleTo.xPosTo = circleFrom.xPos;
      circleTo.yPosTo = circleFrom.yPos;
      bindsDone++;
    }
  }
}

const bindDoneCheck = () => {
  if (bindsDone >= bindingToConnect) {
    bindingComplete = 1;

    document.querySelector(".bookbind__continue").textContent = "Well done";
    document.querySelector(".bookbind__continue").style.textAlign = "center";
    document.querySelector(".bookbind__text h2").innerHTML = "&darr; Continue scrolling &darr;";
    document.querySelector(".bookbind__help").innerHTML = `Or keep connecting <span class="bookbind__amount visually-hidden">0</span>`;
    document.querySelector(".bookbind__help").style.textAlign = "center";
    document.querySelector(".lock--2").classList.remove("visually-hidden");

    ScrollTrigger.refresh();

    const navItems = ["my-printing-empire", "daughters", "quick-enhough"]
    navItems.forEach(item => {
      document.querySelector(`.nav__link--${item}`).classList.remove("nav__locked")
      document.querySelector(`.nav__link--${item}`).classList.add("nav__active")
    });

    lock2 = 1;
  }
}

const handleMouseupBinding = (e) => {

  binderTopList.forEach(circle => {
    if (circle.selected === 1) {
      binderBottomList.forEach(circle2 => {
        bindCheck(circle, circle2, e);
      });
    }
    circle.selected = 0;
  });

  binderBottomList.forEach(circle => {
    if (circle.selected === 1) {
      binderTopList.forEach(circle2 => {
        bindCheck(circle, circle2, e);
      });
    }
    circle.selected = 0;
  });

  if (bindingComplete === 0) {
    bindDoneCheck()
  }

  window.removeEventListener("mouseup", handleMouseupBinding);
  window.removeEventListener("touchend", handleMouseupBinding);
  window.removeEventListener("mousemove", handleMousemoveBinding);
  window.removeEventListener("touchmove", handleMousemoveBinding);
}

const handleMousemoveBinding = (e) => {
  const { x, y } = getCanvasCoordinates(e);
}

canvasBinder.addEventListener("mousedown", handleMousedownBinding);
canvasBinder.addEventListener("touchstart", handleMousedownBinding)
window.addEventListener('resize', bindingResize);



/* BLUE PRINT */

const blueprint = () => {
  const blueprintItemList = ["living", "corner", "childeren", "studio"]
  let blueprintCorrectList = [];
  let blueprintItemSelected = "";

  blueprintItemList.forEach(item => {
    document.querySelector(`.blueprint__${item}--item`).addEventListener("click", () => {
      if (!blueprintCorrectList.includes(item)) {
        blueprintItemList.forEach(item => {
          if (!blueprintCorrectList.includes(item)) {
            document.querySelector(`.blueprint__${item}--blink`).classList.remove("opacity-0")
            document.querySelector(`.blueprint__${item}--blink`).classList.add("blueprint__blinking")
            document.querySelector(`.blueprint__${item}--item`).classList.add("opacity-50")
          }
        });
        document.querySelector(`.blueprint__${item}--item`).classList.remove("opacity-50")
        document.querySelector(`.blueprint`).classList.remove("blueprint__wrong")
        blueprintItemSelected = item;
      }
    })
  });

  blueprintItemList.forEach(item => {
    document.querySelector(`.blueprint__${item}--map`).addEventListener("click", () => {
      if (blueprintItemSelected != "") {
        if (item === blueprintItemSelected) {
          document.querySelector(`.blueprint__${item}--map`).classList.remove("opacity-0")
          document.querySelector(`.blueprint__${item}--item`).classList.add("opacity-10")
          blueprintCorrectList.push(item)
          blueprintItemList.forEach(item => {
            if (!blueprintCorrectList.includes(item)) {
              document.querySelector(`.blueprint__${item}--blink`).classList.add("opacity-0")
              document.querySelector(`.blueprint__${item}--blink`).classList.remove("blueprint__blinking")
              document.querySelector(`.blueprint__${item}--item`).classList.remove("opacity-50")
            }
          });
          blueprintItemSelected = "";

          if (blueprintCorrectList.length === 4) {
            document.querySelector(".blueprint p").textContent = "WELL DONE, thanks for the help!"
            document.querySelector(".blueprint p").classList.add("blueprint__done")
          }
        } else {
          document.querySelector(`.blueprint`).classList.add("blueprint__wrong")
          blueprintItemList.forEach(item => {
            if (!blueprintCorrectList.includes(item)) {
              document.querySelector(`.blueprint__${item}--blink`).classList.add("opacity-0")
              document.querySelector(`.blueprint__${item}--blink`).classList.remove("blueprint__blinking")
              document.querySelector(`.blueprint__${item}--item`).classList.remove("opacity-50")
            }
          });
          blueprintItemSelected = "";
        }
      }
    })
  });
}



/* CORRECTOR */

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



/* CLIFFHANGER */

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



/* INIT */


const $firstLock = document.querySelector(".lock--1")

const observer = new MutationObserver(() => {
  if (!$firstLock.classList.contains("visually-hidden")) {
    canvasBinder.width = 0;
    canvasBinder.width = document.querySelector(".bookbind__width").offsetWidth;

    binderTopList = [];
    binderBottomList = [];
    binding();
  }
});

const init = () => {
  nav(); //DONE
  letterMother();
  appear(); //DONE
  envelope();

  observer.observe($firstLock, { attributes: true, attributeFilter: ["class"] });
  binding();

  blueprint(); //DONE
  corrector(); //DONE
  cliff(); //DONE
}

init();