import React, { useState } from 'react'
import './App.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'


function WeatherApp() {

  const api_key = process.env.REACT_APP_apikey
  

  const [wicon,setWicon] = useState(cloud_icon)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') search()
  }

  const search = async () => {
    try {
      const element = document.getElementsByClassName("cityInput")
      if(element[0].value === "") return 0
      
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`
      
      let response = await fetch (url)
      let data = await response.json()
      const humidity = document.getElementsByClassName("humidity-percent")
      const wind = document.getElementsByClassName("wind-rate")
      const temperature = document.getElementsByClassName("weather-temp")
      const location = document.getElementsByClassName("weather-location")
      
      if (data.cod === 200) {
        
        humidity[0].innerHTML = data.main.humidity + " %"
        wind[0].innerHTML = data.wind.speed + " km/h"
        temperature[0].innerHTML = Math.floor(data.main.temp) + "ºc"
        location[0].innerHTML = data.name
        
        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
          setWicon(clear_icon)
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
          setWicon(cloud_icon)
        } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
          setWicon(drizzle_icon)
        } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
          setWicon(drizzle_icon)
        } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
          setWicon(rain_icon)
        } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
          setWicon(rain_icon)
        } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
          setWicon(snow_icon)
        }
        else {
          setWicon(clear_icon)
        }
      }
      else {
        const location = document.getElementsByClassName("weather-location")
        humidity[0].innerHTML = ""
        wind[0].innerHTML = ""
        temperature[0].innerHTML = ""
        location[0].innerHTML = data.message
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Search' onKeyPress={handleKeyPress}/>
        <div className='search-icon' onClick={search}>
          <img src={search_icon} alt="" />

        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt= '' />
      </div>
      <div className='weather-temp'>-ºc</div>
      <div className="weather-location">Please search for a city</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt=''/>
          <div className="data">
            <div className="humidity-percent">- %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt=''/>
          <div className="data">
            <div className="wind-rate">- km/h</div>
            <div className="text">Wind</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
