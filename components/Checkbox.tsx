import type { JSX } from "preact";

interface CheckboxProps extends JSX.HTMLAttributes<HTMLLabelElement> {}

export default function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <label {...props} class="flex items-center gap-1">
      <input type="checkbox" />
      {children}
    </label>
  );
}
