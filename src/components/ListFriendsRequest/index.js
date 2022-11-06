import React from 'react'
import {Grid, Typography} from "@material-ui/core"

import "./styles.css"


const FriendRequest = ({item}) => {
    const {image, name, subtitle, message} = item;

    return (
        <>
            <div className='friend-request'>
                <div className='friend-request__main'>
                    <img src={image} alt="avatar" />
                    <div className='friend-request__main-content'>
                        <Typography variant="subtitle1" gutterBottom>
                            {name}
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            {subtitle}
                        </Typography>
                        <Typography variant="subtitle2" display="block" gutterBottom>
                            {message}
                        </Typography>
                    </div>
                </div>
                
                <div className='friend-request__action'>
                    <button type='button' className="friend-request__action next">Bỏ qua</button>
                    <button type='button' className="friend-request__action accept">Chấp nhận</button>
                </div>
            </div>
        </>
    )
}

const ListFriendsRequest = ({listFriendsRequest}) => {

  return (
    <>
      <div className="list-friends-request">
        <div className="list-friends-request__container">
            <Typography variant="subtitle1" display="block" className='list-friends-request__container-title' gutterBottom>
                Lời mời kết bạn ({listFriendsRequest.length})
            </Typography>
            {listFriendsRequest.length > 0 && listFriendsRequest.map((friend) => (
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
