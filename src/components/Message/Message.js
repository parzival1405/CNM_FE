import { Avatar, Typography } from "@material-ui/core";
import React, { useState } from "react";
import clsx from "clsx";
import useStyles from "./MessageStyles";
import moment from "moment";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
function Messages({ message }) {
  const { user } = useSelector((state) => state.auth);
  const { currentConversation } = useSelector(
    (state) => state.currentConversation
  );
  const [isShowFullImage, setIsShowFullImage] = useState(false);
  const [imageFull, setImageFull] = useState({
    image: "",
    title: "",
  });
  const classes = useStyles();
  const handleViewFullImage = (image) => {
    setImageFull({ image, title: "Hình ảnh" });
    setIsShowFullImage(true);
  };
  return (
    <>
    {/* {isShowFullImage && (
        <Lightbox
          image={imageFull.image}
          title={imageFull.title}
          onClose={() => setIsShowFullImage(false)}
        />
      )} */}
    <div
      className={clsx(
        classes.chatMessage,
        message?.sender?._id == user._id ? `${classes.chatMessageRight}` : ""
      )}
    >
      <Avatar
        className={message?.sender?._id == user._id ? classes.avatarHidden : ""}
        src={message?.sender?.avatarURL}
      ></Avatar>
      <div
        className={clsx(
          classes.wrapper,
          message?.sender?._id == user._id ? `${classes.wrapperEnd}` : ""
        )}
      >
        {message.text && (
          <div
            className={clsx(
              classes.textWrapper,
              message?.sender?._id == user._id
                ? `${classes.textWrapperColor}`
                : ""
            )}
          >
            <Typography
              className={clsx(
                classes.textContent,
                message?.sender?._id == user._id
                  ? `${classes.flexFirstRight}`
                  : ""
              )}
              color="textPrimary"
              component="p"
              variant="body"
            >
              {message?.text}
            </Typography>
            <Typography
              component="span"
              variant="caption"
              color="textSecondary"
              className={classes.times}
            >
              {moment(message?.createdAt).fromNow()}
            </Typography>
          </div>
        )}
        {message.media?.map((item, index) => (
          <div
            key={index}
            className={clsx(
              classes.media,
              message?.sender?._id == user._id ? `${classes.mediaRight}` : ""
            )}
          >
            {item.type.match(/video/i) && (
              <video controls src={item.url} alt="video" width="50%" />
            )}
            {item.type.match(/image/i) && (
              <LazyLoadImage
                alt={"image"}
                width={"100%"}
                effect="blur"
                useIntersectionObserver
                wrapperClassName={classes.imageWrapper}
                style={{ borderRadius: "1rem" }}
                src={item.url}
                onClick={() => handleViewFullImage(item.url)}
              />
            )}
            {item.type.match(/application/i) && (
              <div
                style={{
                  backgroundColor: "white",
                  padding: ".5rem",
                  borderRadius: ".5rem",
                }}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  {item.url}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Messages;
