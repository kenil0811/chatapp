import { Avatar, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import User from "./User";
import './Header.css';
import Timer from './Timer';

import { Search } from '@material-ui/icons';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Navigation } from 'swiper/core';
SwiperCore.use([Navigation]);

function Header({ userId, users, onChange, pendingUsers }) {
    const [state, setState] = useState({ clicked: false });
    const handleClick = () => {
        setState({ clicked: !state.clicked })
    }
    return (
        <div className="main">
            <div className="timer">
                <div className="search">
                    <IconButton onClick={handleClick}><Search /></IconButton>
                    <input type="text" placeholder={`Search ${users}`} className={state.clicked ? null : "active"} />
                </div>
                <div className="logo">
                    <IconButton style={{ color: "#00bfa6", fontFamily: "cursive", fontSize: "xx-large" }}>Socialise</IconButton>
                </div>
                <div className="profile"><Timer /><IconButton><Avatar src={`https://avatars.dicebear.com/api/human/${users}.svg`} alt="" /></IconButton></div>
            </div>
            <Swiper loop={false} slidesPerView={3} centeredSlides={true} navigation={true} className="user-area mySwiper">
                {
                    userId && users.length > 0 ?
                        <SwiperSlide onClick={() => { onChange(userId) }}>
                            {console.log(userId, users)}
                            <User user={users.find((user) => user.userId === userId)} />
                        </SwiperSlide>
                        : null
                }
                {
                    users
                        ? (users.map((user) => (
                            user.userId !== userId ?
                                <SwiperSlide onClick={() => { onChange(user.userId) }}>
                                    {
                                        pendingUsers.find((pendingUserId) => user.userId === pendingUserId) ?
                                            <User user={user} pending={true} /> :
                                            <User user={user} pending={false} />
                                    }
                                </SwiperSlide> : null
                        )))
                        : null
                }

            </Swiper>
        </div>
    )
}

export default Header;
