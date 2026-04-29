import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-white",
          {
            "bg-brand-accent text-brand-blue hover:bg-brand-accent-hover": variant === "default",
            "bg-brand-red text-white hover:bg-brand-red/90": variant === "destructive",
            "border-2 border-brand-blue bg-transparent hover:bg-slate-100 text-brand-blue": variant === "outline",
            "bg-brand-blue text-white hover:bg-slate-800": variant === "secondary",
            "hover:bg-slate-100 text-slate-900": variant === "ghost",
            "text-brand-blue underline-offset-4 hover:underline": variant === "link",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-12 rounded-md px-8 text-lg": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
