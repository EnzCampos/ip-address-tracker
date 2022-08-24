import React from 'react'
import { MapContainer, TileLayer, useMap , Marker, Popup } from 'react-leaflet'

function App() {
  const [info, setInfo] = React.useState({
    "ipAddress": "192.212.174.101",
    "location": "Brooklin, NY 10001",
    "timezone": "UTC-05:00",
    "isp": "Starlink",
    "position": [40.661311, -73.941910]
  })
  const [input, setInput] = React.useState('')

  function handleChange(event) {
    setInput(event.target.value,)
  }

  function getPosition() {
    let inputHandler = '';
    //HTTP or HTTPS Regex test
    if (/^https?:\/\//.test(input)) {
      inputHandler = `domain=${input}`;
    }
    //IPV4 Regex Test
    if (/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(input)) {
      inputHandler = `ipAddress=${input}`;
    }
    //IPV6 Regex Test
    if (/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/.test(input)) {
      inputHandler = `ipAddress=${input}`;
    }
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_Ace0JgifMIIn5yoWn3ux4cW2sAfyh&${inputHandler}`)
        .then(res => res.json())
        .then(res => setInfo({
            "ipAddress": res.ip,
            "location": `${res.location.region}, ${res.location.city}`,
            "timezone": `UTC ${res.location.timezone}`,
            "isp": res.isp,
            "position": [res.location.lat, res.location.lng]
        }))
      ChangeView();
    }

    function ChangeView({ center, zoom }) {
      const map = useMap();
      map.setView(center, zoom);
      return null;
    }

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">Ip Address Tracker</h1>
        <div className="input-box">
          <input type="text" name="ipAddress" placeholder="Search for any IP address or domain" className="address-input" onChange={handleChange}/>
          <button className="submit-button" onClick={getPosition}>{'>'}</button>
        </div>
        <p className='disclaimer'>If you put an invalid IP or domain it'll use your current device IP. The app won't save any of your information.</p>
      </div>
      <div className="info-box">
        <div className='ip info-item-border'>IP ADDRESS
          <h3 className='ip'>{info.ipAddress ? info.ipAddress : "192.212.174.101"}</h3>
        </div>
        <div className='location info-item-border'>LOCATION
          <h3 className='location middle'>{info.location}</h3>
        </div>
        <div className='timezone info-item-border'>TIMEZONE
          <h3 className='timezone middle'>{info.timezone}</h3>
        </div>
        <div className='isp info-item'>ISP
          <h3>{info.isp}</h3>
        </div>
      </div>
      <div className='map'>
        <MapContainer center={info.position} zoom={14} scrollWheelZoom={true}>
          <ChangeView center={info.position} zoom={14} /> 
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={info.position}>
            <Popup>
              This is the approximated location you've put.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
