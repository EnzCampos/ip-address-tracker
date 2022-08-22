function App() {
  return (
    <div className="App">
      <div className="header">
        <h1 className="title">Ip Address Tracker</h1>
        <div className="input-box">
          <input type="text" name="address" placeholder="Search for any IP address or domain" className="address-input"/>
          <button className="submit-button">{'>'}</button>
        </div>
      </div>
      <div>Info PlaceHolder</div>
      <div>Map PlaceHolder</div>
    </div>
  );
}

export default App;
