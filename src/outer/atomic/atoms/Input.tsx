import { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input">;

export const Input = ({ ...props }: InputProps) => {
  return (
    <input
      {...props}
      className="w-full h-10 px-4 py-2 outline-none border border-gray rounded-lg bg-blank dark:bg-obscure flex items-center justify-center placeholder:font-WindSong placeholder:text-xl placeholder:font-bold placeholder:align-text-bottom placeholder:line-clamp-1"
    />
  );
};
