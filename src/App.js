import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

function App() {
  const [info, setInfo] = React.useState({
    "ipAddress": "192.212.174.101",
    "location": "Brooklin, NY 10001",
    "timezone": "UTC-05:00",
    "isp": "Starlink"
  })

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">Ip Address Tracker</h1>
        <div className="input-box">
          <input type="text" name="address" placeholder="Search for any IP address or domain" className="address-input"/>
          <button className="submit-button">{'>'}</button>
        </div>
      </div>
      <div className="info-box">
        <div className='ip info-item-border'>IP ADDRESS
          <h3>{info.ipAddress}</h3>
        </div>
        <div className='location info-item-border'>LOCATION
          <h3>{info.location}</h3>
        </div>
        <div className='timezone info-item-border'>TIMEZONE
          <h3>{info.timezone}</h3>
        </div>
        <div className='isp info-item'>ISP
          <h3>{info.isp}</h3>
        </div>
      </div>
      <div className='map'>
        <MapContainer center={[40.661311, -73.941910]} zoom={14} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[40.661311, -73.941910]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
