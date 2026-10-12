import React, { useLayoutEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    number: "58%",
    text: "Increase in pick up point use",
    color: "lime",
  },
  {
    number: "23%",
    text: "Decreased in customer phone calls",
    color: "blue",
  },
  {
    number: "27%",
    text: "Better customer engagement",
    color: "dark",
  },
  {
    number: "40%",
    text: "Faster everyday journeys",
    color: "orange",
  },
];



function App() {
  const scene = useRef(null);
  const car = useRef(null);
  const trail = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.from(".intro", {
        y: 18,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });


      
      gsap.fromTo(
        ".road-message",
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: scene.current,
            start: "10% top",
            end: "30% top",
            scrub: 0.5,
          },
        }
      );


      
      gsap.set(".stat", {
        opacity: 0,
        y: 30,
      });

      
      const statsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: scene.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      stats.forEach((_, index) => {
        statsTimeline.to(
          `.stat-${index + 1}`,
          {
            opacity: 1,
            y: 0,
            duration: 0.14,
            ease: "none",
          },
          0.08 + index * 0.19
        );
      });



     
      statsTimeline.to({}, { duration: 0.2 }, 0.8);

      
      gsap.to(car.current, {
        x: () =>
          Math.max(
            0,
            scene.current.clientWidth -
            car.current.offsetWidth -
            12
          ),
        ease: "none",
        scrollTrigger: {
          trigger: scene.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      
      gsap.to(trail.current, {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",
        scrollTrigger: {
          trigger: scene.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      
      ScrollTrigger.refresh();
    }, scene);

    
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main>
      <section className="scroll-scene" ref={scene}>
        <div className="stage">
          <header className="topbar">
            <div className="brand">
              <span className="brand-mark">AR</span>
              ARJUN
            </div>


          </header>

          <div className="headline" aria-label="Welcome">
            WELCOME
          </div>


          <div className="stats">
            {stats.map((stat, index) => (
              <article
                className={`stat stat-${index + 1} ${stat.color}`}
                key={stat.number}
              >
                <strong>{stat.number}</strong>
                <p>{stat.text}</p>
              </article>
            ))}
          </div>

          <div className="road">
            <div className="trail" ref={trail} />
            <div className="road-dashes" />

            <div className="road-text">
              <p className="road-message">WELCOME ARJUN</p>
            </div>

            <img
              className="car"
              ref={car}
              src="/car.png"
              alt="White sports car"
            />
          </div>

          <div className="bottom-row">
            <span>MADE TO MOVE</span>

            <span className="scroll-hint">
              <span className="dot" />
              SCROLL TO SEE IT MOVE
            </span>


          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);