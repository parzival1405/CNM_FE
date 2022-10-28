import React from "react";
import {
  Grid,
} from "@material-ui/core";


import Conversations from "./Conversations";
import BoxChat from "./BoxChat";

import { useSelector } from "react-redux";
import Nav from "./Nav";
import Slider from "./Slider";

function Demo({socket}) {
  const {currentConversation} = useSelector((state) => state.currentConversation)
  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item md={"auto"} style={{ backgroundColor: "#2ab7ca" }}>
        <Nav/>
      </Grid>
      <Grid item md={3}>
        <Conversations/>
      </Grid>
      <Grid item style={{ flexGrow: 1 ,height:"inherit" }}>
        {currentConversation ? <BoxChat style={{ height: "100%" }} /> : 
        ""
        // <Slider/>
        }
      </Grid>
    </Grid>
  );
}

export default Demo;
