import AliceCarousel, { Link } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Slide.scss";

//Arrows
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

const Gallery = () => {
  return (
    <AliceCarousel
      mouseTracking
      autoPlay
      infinite
      autoPlayInterval={1000}
      renderPrevButton={() => (
        <div className="buttons_cover">
          <button className="prev-btn">
            <SlArrowLeft className="prev-btn-custom" size={50} />
          </button>
        </div>
      )}
      renderNextButton={() => (
        <div className="buttons_cover">
          <button className="next-btn">
            <SlArrowRight className="next-btn-custom" size={50} />
          </button>
        </div>
      )}
    >
      <Link
        target="_blank"
        href="https://storage.googleapis.com/pod_public/750/120737.jpg"
      >
        <img src="https://static-cse.canva.com/blob/847064/29.0368567e.avif" />
      </Link>
      <Link
        target="_blank"
        href="https://storage.googleapis.com/pod_public/750/120737.jpg"
      >
        <img src="https://static-cse.canva.com/blob/847064/29.0368567e.avif" />
      </Link>
      <Link
        target="_blank"
        href="https://storage.googleapis.com/pod_public/750/120737.jpg"
      >
        <img src="https://static-cse.canva.com/blob/847064/29.0368567e.avif" />
      </Link>
      <Link
        target="_blank"
        href="https://storage.googleapis.com/pod_public/750/120737.jpg"
      >
        <img src="https://static-cse.canva.com/blob/847064/29.0368567e.avif" />
      </Link>
    </AliceCarousel>
  );
};

export default Gallery;
