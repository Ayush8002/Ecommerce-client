import Wrapper from "../../Wrapper";
import HeroBanner from "./HeroBanner";
import RightColumn from "./RightColumn";
import Right2Column from "./Right2Column";
import HeroBanner2 from "./HeroBanner2";

const HeroColumn = () => {
  return (
    <Wrapper>
      <div className="h-full">
        <div className="grid grid-cols-3 grid-flow-col gap-2 sm:gap-4 mt-4">
          <div className="col-span-2 h-full">
            <div className="">
              <HeroBanner />
            </div>
            <div className="columns-2 sm:mt-4 mt-2 ">
              <div className="">
                <Right2Column />
              </div>
              <div className="">
                <HeroBanner2 />
              </div>
            </div>
          </div>
          <div className="h-full">
            <RightColumn />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default HeroColumn;
