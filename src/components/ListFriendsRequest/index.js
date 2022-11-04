import React from 'react'
import {Grid, Typography} from "@material-ui/core"

import "./styles.css"
import { useDispatch, useSelector } from 'react-redux';


const FriendRequest = ({item}) => {
    const {avatarURL, username, subtitle, message} = item;
    const dispatch = useDispatch();
    return (
        <>
            <div className='friend-request'>
                <div className='friend-request__main'>
                    <img src={avatarURL} alt="avatar" />
                    <div className='friend-request__main-content'>
                        <Typography variant="subtitle1" gutterBottom>
                            {username}
                        </Typography>
                        {/* <Typography variant="subtitle2" display="block" gutterBottom>
                            {subtitle}
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            {message}
                        </Typography> */}
                    </div>
                </div>
                
                <div className='friend-request__action'>
                    <button type='button' className="friend-request__action next">Bỏ qua</button>
                    <button type='button' className="friend-request__action accept">Chấp Nhận</button>
                </div>
            </div>
        </>
    )
}

const ListFriendsRequest = () => {
    const {user} = useSelector((state) => state.auth);
    const listFriendsRequest = user.friendsQueue;
  return (
    <>
      <div className="list-friends-request">
        <div className="list-friends-request__container">
            <Typography variant="subtitle1" display="block" className='list-friends-request__container-title' gutterBottom>
                Lời mời kết bạn ({listFriendsRequest?.length ? listFriendsRequest?.length : "0"})
            </Typography>
            {listFriendsRequest?.length > 0 && listFriendsRequest?.map((friend) => (
                <>
                    <FriendRequest item={friend} key={friend.id}/>
                </>
            ))}
        </div>
      </div>
    </>
  )
}

export default ListFriendsRequest
