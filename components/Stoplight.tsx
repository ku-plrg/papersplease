import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentChildren } from "preact";

interface StoplightProps extends VariantProps<typeof stoplightVariants> {
  children: ComponentChildren;
}

const stoplightVariants = cva(
  "rounded-lg px-1 text-sm",
  {
    variants: {
      variant: {
        default: "bg-white",
        bug: "bg-red-700",
        pass: "bg-green-700",
        idk: "bg-orange-400",
      },
    },
  },
);

export default function Stoplight({ variant, children }: StoplightProps) {
  return <div class={stoplightVariants({ variant })}>{children}</div>;
}
