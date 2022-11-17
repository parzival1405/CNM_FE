import { ImageList, ImageListItem, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import { useSelector } from "react-redux";
// import "react-awesome-lightbox/build/style.css";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: "100%",
  },
  msg: {
    backgroundColor: theme.palette.grey[100],
    padding: ".5rem 1rem",
    textAlign: "center",
    width: "100%",
    borderRadius: ".5rem",
  },
}));
function ListImage({ itemData }) {
  const { media } = useSelector((state) => state.currentConversation);
  const classes = useStyles();
  const [isShowFullImage, setIsShowFullImage] = useState(false);
  const [imageFull, setImageFull] = useState({
    image: "",
    title: "",
  });
  const handleViewFullImageLightBox = (image) => {
    setImageFull({ image, title: "Hình ảnh" });
    setIsShowFullImage(true);
  };
  return (
    <div className={classes.root}>
      {isShowFullImage && (
        <Lightbox
          mainSrc={imageFull.image}
          onCloseRequest={() => setIsShowFullImage(false)}
        />
      )}
      {media?.length === 0 || !media ? (
        <div className={classes.msg}>
          Chưa có ảnh/vieo được chia sẻ trong cuộc hội thoại này
        </div>
      ) : (
        <ImageList rowHeight={160} className={classes.imageList} cols={3}>
          {media?.map((item, index) =>
            item.media.type.match(/video/i) ? (
              <ImageListItem cols={1} key={index} className={classes.image}>
                <video controls src={item.media.url} alt="video" />
              </ImageListItem>
            ) : (
              <ImageListItem
                key={index}
                cols={1}
                onClick={() => handleViewFullImageLightBox(item.media.url)}
                className={classes.image}
              >
                <img src={item.media.url} alt="image1" />
              </ImageListItem>
            )
          )}
        </ImageList>
      )}
    </div>
  );
}

export default ListImage;
