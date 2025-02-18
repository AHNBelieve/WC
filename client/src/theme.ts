import { DefaultTheme } from "styled-components";

export const Default: DefaultTheme = {
  bgColor: "#F2F2F2",
  cardColor: "#CEE0DE",
};
export const PastelGray: DefaultTheme = {
  bgColor: "#F2F2F2",
  cardColor: "#CACACA",
};
export const PastelRed: DefaultTheme = {
  bgColor: "#F9E4E6",
  cardColor: "#FFC6D0",
};
export const PastelOrange: DefaultTheme = {
  bgColor: "#FFFAE6",
  cardColor: "#FFECC7",
};
export const PastelYellow: DefaultTheme = {
  bgColor: "#FEFFCF",
  cardColor: "#FFF8B0",
};
export const PastelGreen: DefaultTheme = {
  bgColor: "#F7FFE6",
  cardColor: "#D4E1D4",
};
export const PastelBlue: DefaultTheme = {
  bgColor: "#F0F7FA",
  cardColor: "#C8D4E3",
};
export const PastelPink: DefaultTheme = {
  bgColor: "#FAF5F7",
  cardColor: "#FAE8EF",
};
export const PastelPurple: DefaultTheme = {
  bgColor: "#F7E9F6",
  cardColor: "#F0C7E6",
};
export const PastelBrown: DefaultTheme = {
  bgColor: "#FFFBE8",
  cardColor: "#E3C9A6",
};

export const handleThemeCase = (
  themeValue: string,
  setTheme: React.Dispatch<React.SetStateAction<DefaultTheme>>
) => {
  // 선택된 테마에 따라 테마 설정
  switch (themeValue) {
    case "light":
      setTheme(Default);
      break;
    case "pastelGray":
      setTheme(PastelGray);
      break;
    case "pastelRed":
      setTheme(PastelRed);
      break;
    case "pastelOrange":
      setTheme(PastelOrange);
      break;
    case "pastelYellow":
      setTheme(PastelYellow);
      break;
    case "pastelGreen":
      setTheme(PastelGreen);
      break;
    case "pastelBlue":
      setTheme(PastelBlue);
      break;
    case "pastelPink":
      setTheme(PastelPink);
      break;
    case "pastelPurple":
      setTheme(PastelPurple);
      break;
    case "pastelBrown":
      setTheme(PastelBrown);
      break;
    default:
      setTheme(Default);
  }
};
