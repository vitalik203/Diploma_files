import "./Footer.scss";
import Map from "./Map";

import ua from "../translations/ua.json";
import en from "../translations/en.json";

interface FooterProps {
  curentLanguage: string;
}

export default function Footer({ curentLanguage }: FooterProps) {
  return (
    <div className="footer-wrapper">
      <div className="footer-grid-cover">
        <div className="map">
          <Map />
        </div>
        <section className="footer-contacts">
          {curentLanguage === "ua"
            ? ua.footer.gridCover.contacts.address
            : en.footer.gridCover.contacts.address}{" "}
          <br />
          <a
            href={`tel:${
              curentLanguage === "ua"
                ? ua.footer.gridCover.contacts.phones[0].number
                : en.footer.gridCover.contacts.phones[0].number
            }{" "}`}
          >
            {curentLanguage === "ua"
              ? ua.footer.gridCover.contacts.phones[0].number
              : en.footer.gridCover.contacts.phones[0].number}{" "}
          </a>
          <br />
          {curentLanguage === "ua" ? "E-mail: " : "E-mail: "}
          <a
            href={`mailto:${
              curentLanguage === "ua"
                ? ua.footer.gridCover.contacts.email[0].address
                : en.footer.gridCover.contacts.email[0].address
            }`}
          >
            {curentLanguage === "ua"
              ? ua.footer.gridCover.contacts.email[0].address
              : en.footer.gridCover.contacts.email[0].address}
          </a>{" "}
          <a
            href={`mailto:${
              curentLanguage === "ua"
                ? ua.footer.gridCover.contacts.email[1].address
                : en.footer.gridCover.contacts.email[1].address
            }`}
          >
            {curentLanguage === "ua"
              ? ua.footer.gridCover.contacts.email[1].address
              : en.footer.gridCover.contacts.email[1].address}
          </a>{" "}
          <br />
          {curentLanguage === "ua" ? "Wiki-сторінка: " : "Wiki page: "}
          <a
            href={
              curentLanguage === "ua"
                ? ua.footer.gridCover.contacts.wikiPage.url
                : en.footer.gridCover.contacts.wikiPage.url
            }
          >
            {curentLanguage === "ua"
              ? ua.footer.gridCover.contacts.wikiPage.label
              : en.footer.gridCover.contacts.wikiPage.label}
          </a>
        </section>
      </div>
      <span className="footer-hr"></span>
      <section
        style={{ display: "block", margin: "0 0 0 25px", color: "white" }}
      >
        {curentLanguage === "ua" ? ua.footer.developer : en.footer.developer}
      </section>
      <span className="right-reserved">
        {curentLanguage === "ua"
          ? ua.footer.rightReserved
          : en.footer.rightReserved}
      </span>
      <a href={ua.footer.feedback} className="feedback" target="_blank">
        {curentLanguage === "ua" ? "ФОРМА ЗВОРОТНЬОГО ЗВЯЗКУ" : "FEEDBACK FORM"}
      </a>
    </div>
  );
}
