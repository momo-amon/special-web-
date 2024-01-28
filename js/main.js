// start scroler
let scrolerBag = document.querySelector(".scroler");
let heightOfBag = document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
  let scrolerTop = document.documentElement.scrollTop;
  scrolerBag.style.width = `${(scrolerTop / heightOfBag) * 100}%`;
});

// end scroler

// check if there's local storge color option
let maincolor = localStorage.getItem("color_option");
if (maincolor !== null) {
  document.documentElement.style.setProperty('--main--color', maincolor);
  // remove active class from all elements
  document.querySelectorAll(".colors-list li").forEach(element => {
    element.classList.remove("active");
  });
  // add active class to the element with data-color that matches maincolor
  document.querySelectorAll(".colors-list li").forEach(element => {
    if (element.dataset.color === maincolor) {
      // add active class 
      element.classList.add("active");
    }
  });
};


// random backgroundi imag 
let backgroundOption = true;

// variable to control  the Interval 
let backgroundInterval;


// toggle spin class on icon
document.querySelector(".icon-settings .settingI").onclick = function () {
  // toggle class fa-spin for rotation on self 
  this.classList.toggle("fa-spin");
  // toggle class open on main settings on self
  document.querySelector(".settings-box").classList.toggle("opin")
};

//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

//  loob on all list items 
colorsLi.forEach(li => {
  // clicc on every list item 
  li.addEventListener("click", (e) => {
    // set color on root
    document.documentElement.style.setProperty("--main--color", e.target.dataset.color);
    // set color on local storg
    localStorage.setItem("color_option", e.target.dataset.color);
    // remove active class from all childerns 
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
      element.classList.remove("active");
    });
    // add active class on self
    e.target.classList.add("active");
  });
});

//switch colors
const randomBackGroundEl = document.querySelectorAll(".randoom-background span");

//  loob on all spans
randomBackGroundEl.forEach(span => {
  // clicc on every list item 
  span.addEventListener("click", (e) => {
    handleActive(e)
    if (e.target.classList.contains('yes')) {
      backgroundOption = true;
      randomizeImgs();
    } else {
      backgroundOption = false;
      clearInterval(intervalValue); // إيقاف تغيير الصورة
    }
  });
});

// select landing page Element
let landing = document.querySelector(".landing-bag");

// get Arrey of Imgs 
let imgsArrey = ["cropped-1.jpg", "cropped-2.jpg", "cropped-3.jpg", "cropped-4.jpg", "cropped-5.jpg", "cropped-6.jpg", "cropped-7.jpg", "cropped-8.jpg"];


// function to randomize Imgs

function randomizeImgs() {
  if (backgroundOption === true) {
    intervalValue = setInterval(() => {
      // get random Number 
      let randomNumber = Math.floor(Math.random() * imgsArrey.length);
      // change Imag URL
      landing.style.backgroundImage = 'url("imags/' + imgsArrey[randomNumber] + '")';
    }, 8000);
  }
};
randomizeImgs();

// select skills selector

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills  outer  height  
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window  height
  let windowHeight = this.innerHeight;

  // window scrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    let allSkills = document.querySelectorAll(".skills .skill-box .skill-progress span");
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// create popup with the image 
let ourImage = document.querySelectorAll(".imag-box img");
ourImage.forEach(img => {
  img.addEventListener('click', (e) => {
    // create overlay Element 
    let overlay = document.createElement('div');
    // add class to overlay
    overlay.className = 'popup-overlay';
    // append overlay to the body 
    document.body.appendChild(overlay);
    // create the popup box 
    let popupBox = document.createElement('div');
    // add class to the popup-box 
    popupBox.className = 'popup-box';
    if (img.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3");
      // create text for heading 
      let imgText = document.createTextNode(img.alt);
      // append the text to the heading 
      imgHeading.appendChild(imgText);
      // append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }
    // create the image 
    let popupImage = document.createElement('img');
    // set the image source to the clicked image source
    popupImage.src = img.src;
    // append the image to the popup box
    popupBox.appendChild(popupImage);
    // append the popup box to the body 
    document.body.appendChild(popupBox);
    // Close the popup when clicking on the overlay
    overlay.addEventListener('click', function (e) {
      overlay.remove();
      popupBox.remove();
    });
  });
});

// select all pullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".links a");

function scrollToSomeWhere(element) {
  element.forEach(ele => {
    ele.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
};
scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

// handle active stats 
function handleActive(ev) {
  // remove active class from all childerns 
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  });
  // add active class on self
  ev.target.classList.add("active");
}

// bullets choose
let bulletSpan = document.querySelectorAll(".bullits-background span");
let bulletCountainer = document.querySelector(".nav-bullets");
let bulletLocation = localStorage.getItem("bullet-option");

if (bulletLocation != null) {
  bulletSpan.forEach(span => {
    span.classList.remove("active");
  });
  if (bulletLocation === "block") {
    bulletCountainer.style.display = "block";
    document.querySelector(".bullits-background .yes").classList.add("active");
  } else {
    bulletCountainer.style.display = "none";
    document.querySelector(".bullits-background .no").classList.add("active");
  }
};

bulletSpan.forEach(span => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletCountainer.style.display = 'block';
      localStorage.setItem("bullet-option", 'block');
    } else {
      bulletCountainer.style.display = 'none';
      localStorage.setItem("bullet-option", 'none');
    }
    handleActive(e)
  });
});

// random local-storge

document.querySelector(".reset-option").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

// toggle menu 
let toggleBtn = document.querySelector(".toggle-menu");
let Tlinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // stop Propagation on togglbtn 
  e.stopPropagation();
  // toggle class "menu-active" on button
  this.classList.toggle("menu-active");
  // toggle class "open" on links 
  Tlinks.classList.toggle("open")
};
// click anyWhere outside menu and toggle button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== Tlinks) {
    if (Tlinks.classList.contains("open")) {
      // toggle class "menu-active" on button
      toggleBtn.classList.toggle("menu-active");
      // toggle class "open" on links 
      Tlinks.classList.toggle("open")
    }
  }
})

// stop Propagation on links
Tlinks.onclick = function (e) {
  e.stopPropagation();
};