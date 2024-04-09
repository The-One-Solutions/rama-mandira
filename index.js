function toggleFunction() {
    console.log('hh')
    var x = document.getElementById("topnav");
    x.classList.toggle("expanded");
}

function checkOrientation() {
    var x = document.getElementById("topnav");
    if (window.matchMedia("(orientation: landscape)").matches) { // Change the class name to "landscape" when in landscape orientation

        if (x.className === "nav-container responsive") {
            x.className = "nav-container"
        }


    } else {}
}


// checkOrientation();

// Listen for the window resize event to detect orientation changes
// window.addEventListener('resize', checkOrientation);
// ****************


// hero-section carousel
var slider1 = document.getElementById('slider1'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');
    // pagination = document.getElementById('pagination');

function slide(wrapper, items, prev, next) {
    var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('slide'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;

    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');

    // Mouse events
    items.onmousedown = dragStart;

    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    // Click events
    prev.addEventListener('click', function () {
        shiftSlide(-1)
    });
    next.addEventListener('click', function () {
        shiftSlide(1)
    });

    // Transition events
    items.addEventListener('transitionend', checkIndex);

    var autoplayInterval = setInterval(function () {
        shiftSlide(1);
    }, 5000);
    // Change the interval as needed

    // Pause autoplay on hover
    wrapper.addEventListener('mouseenter', function () {
        clearInterval(autoplayInterval);
    });

    // Resume autoplay on mouse leave
    wrapper.addEventListener('mouseleave', function () {
        autoplayInterval = setInterval(function () {
            shiftSlide(1);
        }, 5000); // Change the interval as needed
    });


    function dragStart(e) {
        e = e || window.event;
        // e.preventDefault();
        e.stopPropagation();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction(e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        } items.style.left = (items.offsetLeft - posX2) + "px";
    }



    function dragEnd(e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < - threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            items.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
        items.classList.add('shifting');

        if (allowShift) {
            if (! action) {
                posInitial = items.offsetLeft;
            }

            if (dir == 1) {
                items.style.left = (posInitial - slideSize) + "px";
                index++;
            } else if (dir == -1) {
                items.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        };

        allowShift = false;
    }

    function checkIndex() {
        items.classList.remove('shifting');

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    }

    function adjustSliderWidth() {
        var slideWidth = items.getElementsByClassName('slide')[0].offsetWidth;
        var totalWidth = (slidesLength + 2) * slideWidth; // Including cloned slides
        items.style.width = totalWidth + 'px';
        items.style.left = -slideWidth + 'px'; // Adjust initial position to show the first slide
    }

    // Initial adjustment of slider width
    adjustSliderWidth();

    // Adjust slider width when window is resized
    window.addEventListener('resize', adjustSliderWidth);
    
}

slide(slider1, sliderItems, prev, next);



var grid = document.querySelector('.gallery');
var masonry = new Masonry(grid, {
  itemSelector: '.gallery-item',
  columnWidth: '.gallery-item',
  gutter: 10 // Adjust as needed
});



// gallery lightbox
function openLightbox(event, element) {
    event.preventDefault();
    document.body.classList.add('lightbox-open');
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
  
    lightboxImg.src = element.href;
    lightbox.style.display = 'flex';
  }
  
  function closeLightbox() {
    document.body.classList.remove('lightbox-open');
    document.getElementById('lightbox').style.display = 'none';
  }