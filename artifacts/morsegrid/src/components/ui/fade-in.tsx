import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  duration?: number;
}

export function FadeIn({ children, delay = 0, direction = "up", className = "", duration = 0.6 }: FadeInProps) {
  const reduce = useReducedMotion();
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 }
  };

  const initialOffset = reduce ? { x: 0, y: 0 } : directions[direction];

  return (
    <motion.div
      initial={{ opacity: reduce ? 1 : 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
