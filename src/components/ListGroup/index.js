import React from 'react'
import {Grid, Typography} from "@material-ui/core"
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import "./styles.css"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    styled,
    IconButton,
    Box,
    AppBar,
    Toolbar,
    InputBase,
    alpha,
  } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Groups = ({item}) => {
const {image, name,members} = item;


    return (
        <>
            <div className='friend-request'>
                <div className='friend-request__main'>
                    <div className='friend-request__main-content'>
                    <AvatarGroup max={4}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                    </AvatarGroup>
                        <Typography style={{marginLeft:'30%',marginTop:20}}   variant="subtitle1" gutterBottom>
                            {name}
                        </Typography>
                        <Typography style={{marginLeft:'20%',marginTop:20}}  variant="subtitle1" gutterBottom>
                            {members} Thành viên
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}

const ListGroup = ({listFriendsRequest}) => {

    const classes = useStyles();
    const [title, setTitle] = React.useState('');
  
    const handleChange = (event) => {
      setTitle(event.target.value);
    };
  return (
    <>
      <div className="list-friends-request" style={{width:'100%'}}>
        <div style={{display:'flex',flexDirection:'row'}}> 
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={title}
          onChange={handleChange}
        >
          <MenuItem value={10}> Tất cả ({listFriendsRequest.length})</MenuItem>
          <MenuItem value={20}>Tôi quản lý({listFriendsRequest.length})</MenuItem>
        </Select>
      </FormControl>
        </div>
        <div style={{ display: 'flex',flexWrap: 'wrap',justifyContent: 'space-around',}}>
            {listFriendsRequest.length > 0 && listFriendsRequest.map((friend) => (
                <>
                    <Groups item={friend} key={friend.id}/>
                </>
            ))}
        </div>
      </div>
    </>
  )
}

export default ListGroup
