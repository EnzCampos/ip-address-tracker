import React from 'react'

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
      <div>Map PlaceHolder</div>
    </div>
  );
}

export default App;
