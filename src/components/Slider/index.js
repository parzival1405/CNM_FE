import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, } from "@material-ui/core";

function Item({item}) {
  return (
    <Paper>
        <img src={item.src}></img>
    </Paper>
  );
}
function Slider() {
  var items = [
    {
      src: "https://photo2.tinhte.vn/data/attachment-files/2021/07/5557920_CV.jpg",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn-7Q7Hhdo4C0ENkwe9FJAZJCro3rifQu1ZaqrQE4bJBfHLto5mbuKqclb-6YEMn6_BlU&usqp=CAU",
    },
    {
      src: "https://aphoto.vn/wp-content/uploads/2018/12/hinh-anh-phong-canh-dep8.jpg",
    },
  ];
  return (
    <Paper>
      <Carousel>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </Paper>
  );
}
export default Slider;
