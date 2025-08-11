// Importing PNG images requires a module declaration in TypeScript

import { format } from "date-fns";

export const formatDate = (date: number | string) => {
  const d = new Date(date);
  return d.toISOString().split("T")[0].replace(/-/g, "/");
};
// import { format } from 'date-fns';

export function checkIsSingleNumber(num: number) {
  const singleNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const single = singleNumbers.includes(num);
  if (single) {
    return `0${num}`;
  } else {
    return num;
  }
}
export function isValidEgyptianPhone(phone: string): boolean {
  const regex = /^01[0-2,5][0-9]{8}$/;
  return regex.test(phone);
}

export function returnDate(dayNum: number = 5) {
  const month = format(new Date(), "yyyy-MM");
  const day = checkIsSingleNumber(dayNum);
  const test = "2025-07-14T00:00:00Z";
  return `${month}-${day}T00:00:00`;
}
export function checkValue(value: boolean | string) {
  if (!value) {
    return "";
  } else {
    return value;
  }
}
function rgbToRgba(rgb: string, alpha = 0.1) {
  return rgb.replace(/^rgb\((.+)\)$/, `rgba($1, ${alpha})`);
}
function hexToRgba(hex: string, alpha = 0.1) {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
export function makeColorTransparent(color: string, alpha = 0.1) {
  if (color.startsWith("#")) {
    return hexToRgba(color, alpha);
  } else if (color.startsWith("rgb(")) {
    return rgbToRgba(color, alpha);
  } else {
    throw new Error("Unsupported color format");
  }
}
