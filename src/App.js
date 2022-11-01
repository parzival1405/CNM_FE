import React, { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Paper } from "@material-ui/core";
import Chat from "./pages/Chat/Chat";
import Register from "./pages/Auth/AuthRegister";
import "./App.css";
import SocketClient from "./SocketClient";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "./constants/actionType";
import Demo from "./components/Demo";
import Profile from "./components/Modal/Profile";
import OTPModal from "./components/Modal/OTPModal";
import AddFriendModal from "./components/Modal/AddFriendModal";
import AddGroupModal from "./components/Modal/AddGroupModal";
import AddFriendToGroupModal from "./components/Modal/AddFriendToGroupModal";
import Login from "./pages/Auth/AuthLogin";
import { initSocket } from "./redux/actions/socket";
import { io } from "socket.io-client";
import { refresh } from "./redux/actions/auth";
function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Paper style={{ height: "100%", boxShadow: "none" }}>
        {/* {user && <SocketClient />} */}
        <OTPModal/>
        {user && <Profile />}
        {user && <AddFriendModal/>}
        {user && <AddGroupModal />}
        {user && <AddFriendToGroupModal/>}
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={user ? <Navigate to="/"/> : <Login />}></Route>
          <Route
            path="/"
            element={user ? <Chat /> : <Navigate to="/login" replace />}
          ></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Paper>
    </BrowserRouter>
  );
}

export default App;
