import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Marquee from "react-fast-marquee";
import React from "react";

//Main Pages
import Main_news from "./components/Main/Main_news.tsx";
import Main_about from "./components/Main/Main_about.tsx";
import Main_studying from "./components/Main/Main_studying.tsx";
import Main_partnership from "./components/Main/Main_partnership.tsx";
import Main_contacts from "./components/Main/Main_contacts.tsx";
import Main_science from "./components/Main/Main_science.tsx";
import Main_robot from "./components/Main/Main_robot.tsx";

import { Routes, Route } from "react-router-dom";

function App() {
  const [language, setLanguage] = React.useState<string>("ua");

  return (
    <section id="wrapper">
      <Marquee>
        Національний університет «Львівська політехніка» | Lviv Polytechnic |
        National University | Національний університет «Львівська політехніка» |
        Lviv Polytechnic National University | Національний університет
        «Львівська політехніка» | Lviv Polytechnic National University
      </Marquee>
      <Header curentLanguage={language} changeLanguage={setLanguage} />
      {/* {mainPages[currentMainPage] || <Main />} */}
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/news" element={<Main_news />} />
          <Route path="/about" element={<Main_about />} />
          <Route path="/studying" element={<Main_studying />} />
          <Route path="/science" element={<Main_science />} />
          <Route path="/partnership" element={<Main_partnership />} />
          <Route path="/contacts" element={<Main_contacts />} />
          <Route path="/robot" element={<Main_robot language={language} />} />
          <Route
            path="*"
            element={<h1>404 - INVALID URL OR PAGE DOES NOT EXIST</h1>}
          />
        </Routes>
      </main>
      <Footer curentLanguage={language} />
    </section>
  );
}

export default App;
