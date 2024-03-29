import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";
import Slide1 from "../../assets/images/ColumnSlide-2.png";
import Slide2 from "../../assets/images/ColumnSlide-2.2.png";

const HeroBanner2 = () => {

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <div className="relative text-white text-[20px] w-full h-full">
      <Carousel
      className="h-full"
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler) => (
          <div
            onClick={clickHandler}
            className="absolute right-[31px] md:right-[51px] bottom-0 w-3 md:w-[50px] h-3 md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler) => (
          <div
            onClick={clickHandler}
            className="absolute right-0 bottom-0 w-3 md:w-[50px] h-3 md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
      >
        <div>
          <img
            src={Slide1}
            className="aspect-auto object-cover"
            loading="lazy"
          />
        </div>

        <div>
          <img
            src={Slide2}
            className="aspect-auto object-cover"
            loading="lazy"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default HeroBanner2;
