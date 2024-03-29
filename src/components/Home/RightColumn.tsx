import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Slide1 from "../../assets/images/headphone.jpg";
import Slide2 from "../../assets/images/slide-2.png";
import Slide3 from "../../assets/images/slide-3.png";


const image = [Slide1, Slide2, Slide3];

const RightColumn = () => {

  return (
    <div className="relative text-white text-[20px] w-full h-full">
      <div className="h-full">
        <img
          src={image[0]}
          alt="img"
          className="h-full object-cover"
        />
      </div>
    </div>
  );
};

export default RightColumn;
