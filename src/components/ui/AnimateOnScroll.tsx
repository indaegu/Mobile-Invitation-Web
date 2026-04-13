"use client";

import { useInView } from "@/hooks/useInView";

type Animation = "fade-up" | "fade-left" | "fade-right" | "scale" | "fade";
type Delay = 0 | 100 | 200 | 300 | 400 | 500 | 600;

type Props = {
  children: React.ReactNode;
  animation?: Animation;
  delay?: Delay;
  className?: string;
  threshold?: number;
};

const BASE = "scroll-anim";
const ANIM_CLASS: Record<Animation, string> = {
  "fade-up": "scroll-anim-fade-up",
  "fade-left": "scroll-anim-fade-left",
  "fade-right": "scroll-anim-fade-right",
  scale: "scroll-anim-scale",
  fade: "scroll-anim-fade",
};
const DELAY_CLASS: Record<number, string> = {
  0: "",
  100: "anim-delay-100",
  200: "anim-delay-200",
  300: "anim-delay-300",
  400: "anim-delay-400",
  500: "anim-delay-500",
  600: "anim-delay-600",
};

export default function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
  threshold = 0.15,
}: Props) {
  const { ref, inView } = useInView({ threshold });

  const classes = [
    BASE,
    ANIM_CLASS[animation],
    DELAY_CLASS[delay],
    inView ? "visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
