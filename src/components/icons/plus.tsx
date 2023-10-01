import { FC } from "react";
import { TIconProps } from "./types";

export const PlusIcon: FC<TIconProps> = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
    >
      <path
        d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
        fill="currentColor"
      />
    </svg>
  );
};
