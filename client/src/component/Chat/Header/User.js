import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './User.css';


function User( { user, pending } ) {
    const [seed, setSeed] = useState("");
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);

    return (
        <div className="conversation-list">
            <div className="conversation">
                <Avatar className="img" src={`https://avatars.dicebear.com/api/male/${seed}.svg`} alt="p" />
                {pending ?
                    <div className={"title-text title-change"}>{user.name}<p>{user.profession}</p></div>
                : <div className={`title-text title-back"}`}>{user.name}<p>{user.profession}</p></div>
                }
                
            </div>
        </div>
    )
}

export default User;
