import "./Main.scss";
import Slider from "./slider/Slider";

export default function Main() {
  return (
    <section className="main-wrapper">
      <section className="slider-container">
        <Slider />
      </section>
    </section>
  );
}
