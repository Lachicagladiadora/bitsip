import { ComponentPropsWithoutRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input">;

export const Input = ({ ...props }: InputProps) => {
  return (
    <input
      {...props}
      className="w-full h-10 px-3 py-4 md:py-6 md:px-5 outline-none border border-gray rounded-lg bg-blank text-lg  dark:bg-obscure flex items-center justify-center placeholder:font-WindSong placeholder:text-xl placeholder:font-bold placeholder:align-text-bottom placeholder:line-clamp-1"
    />
  );
};
