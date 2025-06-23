import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

//Burger
import { Spin as Hamburger } from "hamburger-react";

//Multylanguage
import ua from "../translations/ua.json";
import en from "../translations/en.json";

//Import img
import en_svg from "/en.svg";
import ua_svg from "/ua.svg";
import logo_svg from "/logos/Logo 1.png";
import logo_text_ua_svg from "/logos/logo 2.svg";
import logo_text_en_svg from "/logos/logo 2en.svg";

//interface
interface HeaderProps {
  curentLanguage: string;
  changeLanguage: (language: string) => void;
}

export default function Header({
  curentLanguage,
  changeLanguage,
}: HeaderProps) {
  const [isOpen, setOpen] = React.useState(false);
  React.useEffect(() => {
    localStorage.setItem("current-language", curentLanguage);
  }, [curentLanguage]);

  const [isScrolled, setScroll] = React.useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 113) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  });

  return (
    <header id="header" className={isScrolled ? "scrolled" : ""}>
      <Link className="menu-link" to="/">
        <div id="header-logo-wrapper">
          <img src={logo_svg} id="header-logo" alt="header-logo" />
          <img
            src={curentLanguage === "en" ? logo_text_en_svg : logo_text_ua_svg}
            id="header-logo-text"
            alt="header-logo-text"
          />
        </div>
      </Link>

      <div className="burger-wrapper">
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </div>
      <nav className={`header-menu ${isOpen ? "" : "hidden"}`}>
        <ul id="menu-list">
          <li className="menu-item">
            <Link className="menu-link" to="/news">
              {curentLanguage === "en" ? en.header.nav[0] : ua.header.nav[0]}
            </Link>
          </li>
          <li className="menu-item">
            <Link className="menu-link" to="/about">
              {curentLanguage === "en" ? en.header.nav[1] : ua.header.nav[1]}
            </Link>
          </li>
          <li className="menu-item">
            <Link className="menu-link" to="/studying">
              {curentLanguage === "en" ? en.header.nav[2] : ua.header.nav[2]}
            </Link>
          </li>
          <li className="menu-item">
            <Link className="menu-link" to="/science">
              {curentLanguage === "en" ? en.header.nav[3] : ua.header.nav[3]}
            </Link>
          </li>
          <li className="menu-item">
            <Link className="menu-link" to="/partnership">
              {curentLanguage === "en" ? en.header.nav[4] : ua.header.nav[4]}
            </Link>
          </li>
          <li className="menu-item">
            <Link className="menu-link" to="/contacts">
              {curentLanguage === "en" ? en.header.nav[5] : ua.header.nav[5]}
            </Link>
          </li>
          <li className="menu-item">
            <Link className="menu-link" to="/robot">
              {curentLanguage === "en" ? en.header.nav[6] : ua.header.nav[6]}
            </Link>
          </li>
          <li className="menu-item country">
            <a
              onClick={() => changeLanguage("ua")}
              className="menu-link-country"
              data-id="ua"
            >
              <img src={ua_svg} alt="UA" />
            </a>
            <div className="vr-header"></div>
            <a
              onClick={() => changeLanguage("en")}
              className="menu-link-country"
              data-id="en"
            >
              <img src={en_svg} alt="EN" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
