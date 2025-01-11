import { ComponentPropsWithoutRef } from "react";

type ButtonProps = {
  _variant: "meal" | "drink";
} & ComponentPropsWithoutRef<"button">;

export const Button = ({ _variant, children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`w-full h-[50px]  flex items-center justify-center rounded-lg uppercase font-[600] text-2xl md:text-3xl border border-gray bg-grayBlank text-gray ${
        _variant === "meal"
          ? "hover:bg-orange hover:border-orange hover:text-orangeBlank"
          : "hover:bg-aquamarine hover:border-aquamarine hover:text-aquamarineBlank"
      }`}
    >
      {children}
    </button>
  );
};
