import { Avatar, IconButton } from '@material-ui/core';
import React from 'react'
import Timer from './Timer';


function Profile({user}) {
    // console.log(user);
    return (
        <div className="profile">
        <Timer /><IconButton><Avatar src={`https://avatars.dicebear.com/api/${user.profile}/${user.name}.svg`} alt="" /></IconButton>
        </div>
    )
}

export default Profile
