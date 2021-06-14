import { Avatar } from '@material-ui/core';
import React from 'react';
import './User.css';

function User({ user, pending }) {
   
    // console.log(user);
    return (
        <div className="conversation-list">

            {pending ?
                (<div className="conversation">
                    <div className="title-change"></div>
                    <Avatar className="img" src={`https://avatars.dicebear.com/api/${user.profile}/${user.name}.svg`} alt="p" style={{ background: "#dbf500", borderRadius: "50%" }} />
                    <div className={"title-text"}>
                        {user.name}
                        <p>{user.profession}</p>
                    </div>
                </div>)
                : (<div className="conversation">
                    <Avatar className="img" src={`https://avatars.dicebear.com/api/${user.profile}/${user.name}.svg`} alt="p" style={{ background: "#dbf500", borderRadius: "50%" }} />
                    <div className={`title-text title-back"}`}>
                        {user.name}
                        <p>{user.profession}</p>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default User;