"use client";
import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
export function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLElement>(null);
  const previous = useRef(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) {
      if (ref.current) ref.current.textContent = value.toLocaleString("fr-FR");
      previous.current = value;
      return;
    }
    const controls = animate(previous.current, value, {
      duration: 0.75,
      ease: "easeOut",
      onUpdate(v) {
        if (ref.current)
          ref.current.textContent = Math.round(v).toLocaleString("fr-FR");
      },
    });
    previous.current = value;
    return () => controls.stop();
  }, [value, reduce]);
  return (
    <strong ref={ref} aria-label={value.toLocaleString("fr-FR")}>
      {value.toLocaleString("fr-FR")}
    </strong>
  );
}
