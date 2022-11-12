import React from "react";
import SearchComponent from "../Search";
import { Grid, List, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import PersonAddIcon from "@material-ui/icons/PersonAdd";

import "./styles.css";
import Friend from "./Friend";

const navList = [
  {
    id: 1,
    logo: "https://images.assetsdelivery.com/compings_v2/yupiramos/yupiramos2004/yupiramos200436847.jpg",
    name: "Danh sách kết bạn",
  },
  {
    id: 2,
    logo: "https://images.assetsdelivery.com/compings_v2/yupiramos/yupiramos2004/yupiramos200436847.jpg",
    name: "Danh sách nhóm",
  },
];

function PhoneBooks({ socket }) {
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <>
      <div className="conversation-sidebar">
        <SearchComponent />
        <div className="conversation-sidebar__nav">
          <div className="conversation-sidebar__nav-add">
            <PersonAddIcon size="small" />
            <p>Thêm bạn bằng số điện thoại</p>
          </div>
          {navList?.map((item) => (
              <div key={item.id} className="conversation-sidebar__nav-item">
                <img src={item.logo} alt="logo" />
                <p>{item.name}</p>
              </div>
          ))}
        </div>
        <Divider />
        <List style={{ maxHeight: 640, overflow: "auto" }}>
          {user?.friends?.map((friend) => 
            <Friend key={friend._id} friend={friend} isDelete={true} />
          )}
        </List>
      </div>
    </>
  );
}

export default PhoneBooks;
