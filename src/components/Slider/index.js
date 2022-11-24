import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";

function Item({ item }) {
  return (
    <div>
      <img style={{ width: "100%", height: "100%" }} src={item.src}></img>
    </div>
  );
}
function Slider() {
  var items = [
    {
      src: require("../../assets/slide_img1.jpg"),
    },
    {
      src: require("../../assets/slide_img2.jpg"),
    },
    {
      src: require("../../assets/slide_img3.jpg"),
    },
    {
      src: require("../../assets/slide_img4.jpg"),
    },
  ];
  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}
export default Slider;
