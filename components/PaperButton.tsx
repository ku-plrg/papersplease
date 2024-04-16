import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { cva, type VariantProps } from "class-variance-authority";

interface PaperButtonProps
  extends
    Omit<JSX.HTMLAttributes<HTMLButtonElement>, "size">,
    VariantProps<typeof buttonVariants> {
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        pass: "bg-green-700 text-white shadow hover:bg-green-700/90",
        bug:
          "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
        idk: "bg-orange-700 text-white shadow hover:bg-orange-700/90",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "pass",
      size: "default",
    },
  },
);

export function PaperButton({ variant, size, ...props }: PaperButtonProps) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={buttonVariants({ variant, size })}
    />
  );
}
