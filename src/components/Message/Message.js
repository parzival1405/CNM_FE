import { Avatar, Typography } from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import useStyles from "./MessageStyles";

import { useSelector } from "react-redux";

function Messages({ message }) {
  const { user } = useSelector((state) => state.auth);
  const { currentConversation } = useSelector(
    (state) => state.currentConversation
  );
  const classes = useStyles();

  return (
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
            {/* <Typography
              component="span"
              variant="caption"
              color="textSecondary"
              className={classes.times}
            >
              {moment(message?.createdAt).fromNow()}
            </Typography> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
