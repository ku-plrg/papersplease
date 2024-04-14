import { cva, type VariantProps } from "class-variance-authority";

interface StoplightProps extends VariantProps<typeof stoplightVariants> {}

const stoplightVariants = cva(
  "rounded-full w-3 h-3",
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

export default function Stoplight({ variant }: StoplightProps) {
  return <div class={stoplightVariants({ variant })} />;
}
