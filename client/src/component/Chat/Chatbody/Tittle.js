import { IconButton } from '@material-ui/core';
import React from 'react';
import './Tittle.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function Title( { name,about } ) {
    return (
        <div className="chat-title">
            {/* {console.log(about)} */}
            <span>{`${name}`} <br />{`${about}`} </span>
            <IconButton><MoreVertIcon fontSize="large" /></IconButton>
        </div>
    )
}

export default Title
