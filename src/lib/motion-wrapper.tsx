import React, { HTMLAttributes, forwardRef } from 'react';

// Define the props for the motion components
type MotionProps = HTMLAttributes<HTMLElement> & {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  variants?: Record<string, unknown>;
  whileHover?: Record<string, unknown>;
  whileTap?: Record<string, unknown>;
  whileFocus?: Record<string, unknown>;
  whileInView?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  children?: React.ReactNode;
};

// Create a styled component that applies animations based on props
const AnimatedDiv = forwardRef<HTMLDivElement, MotionProps>(
  ({ 
    initial, 
    animate, 
    transition, 
    variants, 
    whileHover, 
    whileTap, 
    whileFocus, 
    whileInView, 
    exit,
    style,
    className,
    children,
    ...props 
  }, ref) => {
    // Apply animation styles using CSS transitions
    const animationStyle = {
      ...style,
      transition: transition ? 
        `transform ${transition.duration || 0.3}s ${transition.ease || 'ease'} ${transition.delay || 0}s, opacity ${transition.duration || 0.3}s ${transition.ease || 'ease'} ${transition.delay || 0}s` 
        : undefined,
      ...(animate && animate),
    };

    return (
      <div
        ref={ref}
        className={className}
        style={animationStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AnimatedDiv.displayName = 'AnimatedDiv';

// Export a simplified motion API
export const motion = {
  div: AnimatedDiv,
  span: forwardRef<HTMLSpanElement, MotionProps>(
    (props, ref) => <AnimatedDiv as="span" {...props} ref={ref as any} />
  ),
  p: forwardRef<HTMLParagraphElement, MotionProps>(
    (props, ref) => <AnimatedDiv as="p" {...props} ref={ref as any} />
  ),
  h1: forwardRef<HTMLHeadingElement, MotionProps>(
    (props, ref) => <AnimatedDiv as="h1" {...props} ref={ref as any} />
  ),
  h2: forwardRef<HTMLHeadingElement, MotionProps>(
    (props, ref) => <AnimatedDiv as="h2" {...props} ref={ref as any} />
  ),
  h3: forwardRef<HTMLHeadingElement, MotionProps>(
    (props, ref) => <AnimatedDiv as="h3" {...props} ref={ref as any} />
  ),
  li: forwardRef<HTMLLIElement, MotionProps>(
    (props, ref) => <AnimatedDiv as="li" {...props} ref={ref as any} />
  ),
  button: forwardRef<HTMLButtonElement, MotionProps>(
    (props, ref) => <AnimatedDiv as="button" {...props} ref={ref as any} />
  ),
};