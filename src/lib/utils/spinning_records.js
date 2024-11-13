import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export const setupRecords = () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".record-left", {
        rotation: -720,
        ease: "none",
        scrollTrigger: {
            trigger: ".record-left",
            scrub: 2,
        },
    });
    gsap.to(".record-right", {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
            trigger: ".record-right",
            scrub: 2,
        },
    });
    gsap.to(".lower-record-left", {
        rotation: -720,
        ease: "none",
        scrollTrigger: {
            trigger: ".lower-record-left",
            scrub: 2,
        },
    });
    gsap.to(".lower-record-right", {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
            trigger: ".lower-record-right",
            scrub: 2,
        },
    });
}