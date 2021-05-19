import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./Join.css";

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import LaptopIcon from '@material-ui/icons/Laptop';
import bg from "../../img/bg.svg";
import wave from "../../img/wave.png";

import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/navigation/navigation.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from "swiper/core";

SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

const ENDPOINT = 'http://localhost:5000';


const Join = () => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState({});
  const [namespaceId, setNamespaceId] = useState(0);
  const [maxCount] = useState(100);
  const [count, setCount] = useState(10);

  useEffect(() => {

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
        setLocation({ "long": position.coords.longitude, "lat": position.coords.latitude });
        fetch(`${ENDPOINT}/check?long=${position.coords.longitude}&lat=${position.coords.latitude}`)
          .then(res => res.json())
          .then(
            (result) => {
              if (result.status === 'success')
                setNamespaceId(result.data.id)
            }
          )
      });
    }
    else {
      alert("please allow location access")
    }
  }, []);


  const checkNull = async (event) => {
    if (!name || !profession || !about) {
      alert("Please fill in your Details");
      event.preventDefault();
    }
    else if (!('long' in location)) {
      alert("Please allow location access");
      event.preventDefault();
    }
    else if (namespaceId === 0) {
      alert("Sorry! You're not near any Chat area");
      event.preventDefault();
    }
    else {
      console.log("Looks good");
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'name': name, 'profession': profession, 'about': about, 'namespaceId': namespaceId })
      };

      let res = await fetch(`${ENDPOINT}/addDetails`, requestOptions)
      let result = await res.json()
      if (result.status === "success") {
        console.log(result.data);
        history.push(`/chat?userId=${result.data}`)
      }
      else
        console.log("error adding user")
    }
  }

  useEffect(() => {
    setCount(maxCount - about.length);
  }, [about, maxCount])

  const inputs = document.querySelectorAll(".input");
  function addClass() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function removeClass() {
    let parent = this.parentNode.parentNode;
    if (this.value === '') {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("focus", addClass);
    input.addEventListener("blur", removeClass);
  });

  return (
    <div>
      <img className="wave" src={wave} alt="Wave" />
      <div className="container">
        <div className="img">
          <img src={bg} alt="background" />
        </div>
        <div className="login-content">
          <div className="form">
            <div className="section">
              <Swiper effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                coverflowEffect={{
                  'rotate': 0,
                  'stretch': 30,
                  'depth': 100,
                  'modifier': 6,
                  'slideShadows': false
                }}
                navigation={false}
                className="mySwiper">
                <div class="swiper-wrapper">
                  <SwiperSlide><img src={`https://avatars.dicebear.com/api/initials/${name}.svg`} alt="" /></SwiperSlide>
                  <SwiperSlide><img src={`https://avatars.dicebear.com/api/avataaars/${name[0]}.svg`} alt="" /></SwiperSlide>
                  <SwiperSlide><img src={`https://avatars.dicebear.com/api/micah/${profession}.svg`} alt="" /></SwiperSlide>
                  <SwiperSlide><img src={`https://avatars.dicebear.com/api/gridy/${profession[0]}.svg`} alt="" /></SwiperSlide>
                  <SwiperSlide><img src={`https://avatars.dicebear.com/api/female/${name}.svg`} alt="" /></SwiperSlide>
                  <SwiperSlide><img src={`https://avatars.dicebear.com/api/male/${name}.svg`} alt="" /></SwiperSlide>
                  <SwiperSlide><img src={`https://avatars.dicebear.com/api/bottts/${name[1]}.svg`} alt="" /></SwiperSlide>
                </div>
              </Swiper>
            </div>
            <h2 className="title">Your Details</h2>
            <div className="input-div one">
              <div className="i">
                <AccountCircleOutlinedIcon />
              </div>
              <div className="div">
                <input className="input"
                  placeholder="Full Name"
                  type="text"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>
            <div className="input-div">
              <div className="i">
                <LaptopIcon />
              </div>
              <div className="div">
                <input className="input"
                  placeholder="Profession"
                  type="text"
                  onChange={(event) => setProfession(event.target.value)}
                />
              </div>
            </div>
            <div className="input-div about">
              <div className="i">
                <InfoOutlinedIcon />
              </div>
              <div className="div">
                <textarea id="value" className="input"
                  placeholder="About You"
                  type="text"
                  spellcheck="True"
                  maxLength={maxCount}
                  onChange={(event) => setAbout(event.target.value)}
                  style={count <= 50 ? count <= 10 ? { color: "#ff5722" } : { color: "#4caf50" } : null}
                />
                <p className="show" style={count <= 50 ? count <= 10 ? { color: "#ff5722", fontWeight: "bolder" } : { color: "#4caf50", fontWeight: "bolder" } : null}>{count}</p>
              </div>
            </div>
            <button className="btn" type="button" onClick={(event) => checkNull(event)}>
              Proceed
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Join;
