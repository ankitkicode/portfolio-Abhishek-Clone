function valueSetters() {
    gsap.set("#nav a", {
        y: "-100%",
        opacity: 0
    })
    gsap.set("#home span .child", {
        y: "100%"
    })
    gsap.set("#home .row img", {
        opacity: 0
    })

    document.querySelectorAll("#Visual>g").forEach(function (e) {
        var character = e.childNodes[1].childNodes[1];
        character.style.strokeDasharray = character.getTotalLength() + 'px';
        character.style.strokeDashoffset = character.getTotalLength() + 'px';
    })
}
function revealToSpan() {
    document.querySelectorAll(".reveal")
        .forEach(function (elem) {
            var parent = document.createElement("span");
            var child = document.createElement("span");

            parent.classList.add("parent");
            child.classList.add("child")

            child.innerHTML = elem.innerHTML;
            parent.appendChild(child);

            elem.innerHTML = "";
            elem.appendChild(parent);
        });
}
function loaderAnim() {
    var tl = gsap.timeline();

    tl.from("#loader .child span", {
        x: 100,
        delay: .5,
        stagger: .2,
        duration: 1,
        ease: Circ.easeInOut
    })

    tl.to("#loader .parent .child", {
        y: "-100%",
        duration: 1,
        delay: 1,
        ease: Circ.easeInOut
    })
    tl.to(".load",{
        opacity:0,
        y:10,
        duration:.4
    })
    tl.to("#loader", {
        height: 0,
        duration: 1,
        ease: Circ.easeInOut
    })
    tl.to("#green", {
        height: "100%",
        top: 0,
        duration: 1,
        delay: -.8,
        ease: Circ.easeInOut
    })
    tl.to("#green", {
        height: "0%",
        duration: 0.5,
        delay: -.5,
        ease: Circ.easeInOut,
        onComplete: function () {
            animateHomepage();
        }
    })


}
function animateHomepage() {

    var tl = gsap.timeline();

    tl.to("#nav a", {
        y: 0,
        opacity: 1,
        stagger: .05,
        ease: Expo.easeInOut
    })
    tl.to("#home .parent .child ", {
        y: 0,
        stagger: .1,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    tl.to("#home .row img ", {
        opacity: 1,
        delay: -.5,
        ease: Expo.easeInOut,
        onComplete: function () {
            animateSvg();
        }
    })
}
function animateSvg() {

    gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: Expo.easeInOut,

    })
}

function locoin() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });
}

function cardShow() {
    document.querySelectorAll(".cnt, .aks")
        .forEach(function (cnt) {
            var showingaImage;
            cnt.addEventListener("mousemove", function (dets) {
                console.log();
                document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
                showingaImage = dets.target;
                showingaImage.style.filter = "grayscale(90%)"
                document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px,${dets.clientY}px)`;
                document.querySelector("#page2").style.backgroundColor = "#" + dets.target.dataset.color;
            })

            cnt.addEventListener("mouseleave", function (dets) {
                console.log();
                document.querySelector("#cursor").children[showingaImage.dataset.index].style.opacity = 0;
                showingaImage.style.filter = "grayscale(0)"
                document.querySelector("#page2").style.backgroundColor = "#F2F2F2";
            })
        })
}
function card(){
    gsap.to("#imagery #imgright .imgcntnr",{
        rotate:3,
        duration:3,
        scrollTrigger:{
            trigger:"#imagery ",
            scroller:"#main",
            // markers:true,
            start:"top 90%",
            end:"top 50%",
            scrub:2
        }
    })
    gsap.from("#imagery #imgleft h1",{
        opacity:0,
        y:100,
        duration:2,
        scrollTrigger:{
            trigger:"#imagery ",
            scroller:"#main",
            start:"top 50%",
            end:"top 20%",
            scrub:2
        }
    })
}

function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}


loco();
revealToSpan();
valueSetters()
loaderAnim();
locoin();
cardShow();
card();

var p4TL = gsap.timeline();

p4TL.from("#page4 .p4-rev .rev-l",{
    opacity:0,
    x:-200,
    scrollTrigger:{
        trigger:"#page4",
        scroller:"#main",
        start:"top -10%",
        end:"top -30%",
        scrub:2,
    }

})
p4TL.from("#page4 .p4-rev .rev-r .rev-box h2",{
    opacity:0,
    scale:2,
    y:-100,
    stagger:.1,
    scrollTrigger:{
        trigger:"#page4",
        scroller:"#main",
        start:"top 20%",
        end:"top -30%",
        scrub:2
    }

})
p4TL.from("#page4 .p4-rev .rev-r .rev-box .gola",{
    opacity:0,
    scale:0,
    scrollTrigger:{
        trigger:"#page4",
        scroller:"#main",
        start:"top 20%",
        end:"top -30%",
        scrub:2
    }

})


var p5TL = gsap.timeline();

p5TL.from("#page5 .p5-row h1",{
    opacity:0,
    scale:2,
    scrollTrigger:{
        trigger:"#page5 .p5-row h1",
        scroller:"#main",
        start:"top 60%",
        end:"top 30%",
        scrub:2
    }

})
.from("#page5 .p5-row2 .round",{
    opacity:0,
    x:-300,
    duration:4,
    scrollTrigger:{
        trigger:"#page5 ",
        scroller:"#main",
        start:"top 20%",
        end:"top -20%",
        scrub:2
    }

})
.from("#page5 .p5-row3 .social",{
    opacity:0,
    scale:0.2,
    duration:4,
    stagger:1,
    scrollTrigger:{
        trigger:"#page5 ",
        scroller:"#main",
        start:"top -20%",
        end:"top -60%",
        scrub:2
    }

})

document.addEventListener("mousemove", function (dets) {
    document.querySelector("#curs").style.left = `${dets.x }px`
    document.querySelector("#curs").style.top = `${dets.y }px`
  })


gsap.to("#page6 .p1scroll h1",{
    x:"-70%",
    duration:14,
    scrollTrigger:{
        trigger:"#page6",
        scroller:"#main",
        start:"top 50%",
        end:"top -40%",
        scrub:2
    }
})
gsap.to("#page6 .p3scroll h1",{
    x:"-70%",
    duration:14,
    scrollTrigger:{
        trigger:"#page6",
        scroller:"#main",
        start:"top 50%",
        end:"top -40%",
        scrub:3
    }
})
// gsap.to("#page6 .pscroll h1",{
//     x:"70%",
//     duration:14,
//     scrollTrigger:{
//         trigger:"#page6",
//         scroller:"#main",
//         start:"top 50%",
//         end:"top -40%",
//         scrub:3
//     }
// })

document.querySelector(".incur").addEventListener("mouseenter",function(){
    document.querySelector("#curs").style.scale="2.5"
})
document.querySelector(".incur").addEventListener("mouseleave",function(){
    document.querySelector("#curs").style.scale="1"
})
document.querySelector(".incu").addEventListener("mouseenter",function(){
    document.querySelector("#curs").style.scale="2.5"
})
document.querySelector(".incu").addEventListener("mouseleave",function(){
    document.querySelector("#curs").style.scale="1"
})


gsap.from("#work .w-cntnr h3",{
    y:200,
    opacity:0,
    duration:1,
    scrollTrigger:{
        trigger:"#work",
        scroller:"#main",
        start:"top 50%",
        end:"top 10%,",
        scrub:3
    }
})
gsap.from("#work .w-cntnr h2",{
    y:200,
    opacity:0,
    duration:1,
    scrollTrigger:{
        trigger:"#work",
        scroller:"#main",
        start:"top 50%",
        end:"top 10%,",
        scrub:3
    }
})
