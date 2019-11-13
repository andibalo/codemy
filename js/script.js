$(window).on("load", () => {
  $("#loaderImage").fadeOut();

  //differnece between delay and giving seconds to fadeout is on fadeout is the length of animation
  //but with delay stops the program for a set time
  $("#preloader")
    .delay(350)
    .fadeOut();
});

const showHideNav = () => {
  if ($(window).scrollTop() > 50) {
    $(".navbar").addClass("navBlue");
  } else {
    $(".navbar").removeClass("navBlue");
  }
};

$(window).on({
  scroll: () => {
    showHideNav();
  },
  load: () => {
    showHideNav();
  }
});

//TYPEWRITER EFFECT
var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

$(() => {
  $("#teamMembers").owlCarousel({
    items: 2,
    loop: true,
    smartSpeed: 700,
    autoplay: true,
    autoplayHoverPause: true,
    nav: true,
    dots: false,
    navText: [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>'
    ]
  });
});

//@TODO find out how to make fade animation
$(() => {
  $("#coursesTabs").responsiveTabs({
    animation: "slide"
  });
});

//ISOTOPE FILETRING
$(window).on("load", () => {
  //Init Isotope
  $("#isotopeContainer").isotope({});

  //Isotope filter buttons
  //IMPORTANT: remove span child element from button element eotherwise selector e.target or This will select
  //the child element span that is without attrs and reutrn undefined
  //In OTHER WORDS selected element wilk return the content inside or child element of selected elemnt

  //TO ACCESS attribute of DOM element tha tirggered the event handler we can use THIS or EVENT obj such that e.target.getAttribute('atrr name')
  $("#filterButtons").on("click", "button", e => {
    var filterValue = e.target.getAttribute("data-filter");

    $("#isotopeContainer").isotope({
      filter: filterValue
    });

    //find method finds child elemnts of selected element with a given selector
    $("#filterButtons")
      .find(".active")
      .removeClass("active");
    e.target.classList.add("active");
  });
});

//MAGNIFIC POPUP
$(".projectWrapper").magnificPopup({
  delegate: "a", // child items selector, by clicking on it popup will open
  type: "image",
  gallery: {
    enabled: true
  }
});

//GOOGLE MAPS API

$(window).on("load", () => {
  // The location of myCoordinates
  var myCoordinates = { lat: -6.23185, lng: 106.83482 };
  // The map, centered at myCoordinates
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: myCoordinates
  });
  // The marker, positioned at myCoordinates
  var marker = new google.maps.Marker({ position: myCoordinates, map: map });
});

//Get Year
var year = new Date().getFullYear();
$("#year").html(year);
