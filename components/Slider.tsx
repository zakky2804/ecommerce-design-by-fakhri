"use client";

import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";

const Slider = ({ children }: React.PropsWithChildren) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            if (slider && slider.track && slider.track.details) {
              slider.next();
            }
          }, 2000);
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  // update slider kalau children berubah
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [children, instanceRef]);

  return (
    <div className="w-full">
      <div ref={sliderRef} className="keen-slider">
        {children}
      </div>

      {/* Navigasi Dots */}
      {loaded && instanceRef.current?.track?.details && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from(
            { length: instanceRef.current.track.details.slides.length },
            (_, idx) => (
              <button
                key={idx}
                aria-label={`Slide ${idx + 1}`}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`size-3 rounded-full transition-colors ${
                  currentSlide === idx ? "bg-primary" : "bg-accent"
                }`}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Slider;
