import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

// Type-safe motion component wrappers to avoid TypeScript conflicts
// between React event handlers and Framer Motion animation handlers

export type MotionDivProps = Omit<HTMLMotionProps<"div">, 'onAnimationStart' | 'onDragStart' | 'onDrag' | 'onDragEnd'>;
export type MotionButtonProps = Omit<HTMLMotionProps<"button">, 'onAnimationStart' | 'onDragStart' | 'onDrag' | 'onDragEnd'>;
export type MotionSectionProps = Omit<HTMLMotionProps<"section">, 'onAnimationStart' | 'onDragStart' | 'onDrag' | 'onDragEnd'>;
export type MotionSpanProps = Omit<HTMLMotionProps<"span">, 'onAnimationStart' | 'onDragStart' | 'onDrag' | 'onDragEnd'>;

export const MotionDiv = React.forwardRef<HTMLDivElement, MotionDivProps>((props, ref) => (
  <motion.div ref={ref} {...(props as any)} />
));
MotionDiv.displayName = "MotionDiv";

export const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>((props, ref) => (
  <motion.button ref={ref} {...(props as any)} />
));
MotionButton.displayName = "MotionButton";

export const MotionSection = React.forwardRef<HTMLElement, MotionSectionProps>((props, ref) => (
  <motion.section ref={ref} {...(props as any)} />
));
MotionSection.displayName = "MotionSection";

export const MotionSpan = React.forwardRef<HTMLSpanElement, MotionSpanProps>((props, ref) => (
  <motion.span ref={ref} {...(props as any)} />
));
MotionSpan.displayName = "MotionSpan";