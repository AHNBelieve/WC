// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Default, handleThemeCase } from "./theme.ts";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserTheme } from "./api/userProfile.ts";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital@0;1&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub,  tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
/* body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  line-height: 1.2;
  background-color: white;
} */
html,body{
  height: 100vh;
  overflow: hidden;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

const client = new QueryClient();

const Main = () => {
  const [theme, setTheme] = useState(Default); // 추가: 테마 상태 관리
  useEffect(() => {
    const func = async () => {
      const theme = await getUserTheme();
      if (theme) {
        handleThemeCase(theme, setTheme);
      }
    };
    func();
  }, [setTheme]);
  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* 추가: ThemeProvider에 테마 상태 전달 */}
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<App setTheme={setTheme} />} />{" "}
          {/* 변경: App에 setTheme 전달 */}
          <Route
            path="/date/:dateId"
            element={<App setTheme={setTheme} />}
          />{" "}
          {/* 변경: App에 setTheme 전달 */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <Main /> {/* 변경: Main 컴포넌트 사용 */}
    </QueryClientProvider>
  </RecoilRoot>
  // </StrictMode>,
);
