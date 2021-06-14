import React, { useState } from 'react';
import User from "./User";
import './Header.css';
import { Swiper, SwiperSlide } from "swiper/react";
import Search from "./Search";
import Profile from './Profile';
import "swiper/swiper.min.css";
import { useMediaPredicate } from "react-media-hook";

function Header({ userId, users, onChange, pendingUsers }) {
    users = users.sort((a, b) => (a.name > b.name) ? 1 : -1); //Sorting
    const scr400 = useMediaPredicate("(max-width: 400px");
    const [searchTerm, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const userObject = {
        name: "undefined",
    }
    const searchHandler = (searchTerm) => {
        setSearch(searchTerm);
        if (searchTerm !== "") {
            const newContactList = users.filter((user) => {
                return Object.values(user).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
            });
            setSearchResults(newContactList);
        }
        else {
            setSearchResults(users);
        }
    };
    return (
        <div className="main">
            <div className="timer">
                {/* search Bar */}
                <Search term={searchTerm} searchKeyword={searchHandler} />
                {/* logo */}
                <div className="logo" style={{ color: "#00bfa6", fontFamily: "cursive", fontSize: "x-large" }}>Socialise</div>
                {/* Profile Pic */}
                <Profile user={users.length > 0 ? users.find((user) => (user.userId === userId)) : userObject} />
            </div>
            <Swiper loop={false} slidesPerView={scr400 ? 3 : 8} spaceBetween={scr400 ? 50 : 30} centeredSlides={true} className="user-area mySwiper">
                {searchTerm.length < 1 ?
                    users ?
                        (users.map((user) => (
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
                    : searchResults ?
                        (searchResults.map((user) => (
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
