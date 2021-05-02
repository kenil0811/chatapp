import { Avatar, IconButton } from '@material-ui/core';
import React from 'react';
import User from "./User";
import Button from '@material-ui/core/Button';
import './Header.css';
import Timer from './Timer';

function Header( { userId, users, onChange, pendingUsers } ) {
    return (
        <div>
            <div className="timer">
                <IconButton>
                    <Timer />
                </IconButton>
                <IconButton style={{ color: "#00bfa6", fontFamily: "cursive", fontSize: "xx-large" }}>
                    <span>Socialise</span>
                </IconButton>
                <div className="profile">
                    <IconButton>
                        <Avatar src="https://avatars.dicebear.com/api/male/:srk.svg" alt="" />
                    </IconButton>
                </div>
            </div>
            <div className="user-area">
                {
                    userId && users.length>0 ?
                    <Button onClick={() => {onChange(userId)}}>
                        {console.log(userId, users)}
                        <User user={users.find((user) => user.userId == userId)}/>
                    </Button> 
                    : null
                }
                {
                    users 
                    ? ( users.map((user) => (
                        user.userId != userId ?
                        <Button onClick={() => {onChange(user.userId)}}>
                            {
                                pendingUsers.find((pendingUserId) => user.userId == pendingUserId) ?
                                <User user={user} pending={true} /> :
                                <User user={user} pending={false} />
                            }
                        </Button> : null
                    )))
                    : null
                }

            </div>
        </div>
    )
}

export default Header;
