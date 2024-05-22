import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 2,
  infinite: false,
  autoplay: false,
  autoplaySpeed: 1000,
};

<div className="doctorSubjects">
<div className="slider-wrapper">
  <Slider {...settings}>
    <div className="myyf">
      <div className="mybbox"></div>
    </div>
    <div className="myyf">
      <div className="mybbox"></div>
    </div>
    <div className="myyf">
      <div className="mybbox"></div>
    </div>
    <div className="myyf">
      <div className="mybbox"></div>
    </div>
    <div className="myyf">
      <div className="mybbox"></div>
    </div>
    <div className="myyf">
      <div className="mybbox"></div>
    </div>
    <div className="myyf">
      <div className="mybbox"></div>
    </div>
    <div className="myyf">
      <div className="mybbox"></div>
    </div>
    <div className="myyf">
      <div className="mybbox"></div>
    </div>
  </Slider>
</div>
</div>