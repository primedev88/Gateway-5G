import "./Credential.css";
import { RxCross2 } from "react-icons/rx";
import { PiEye,PiEyeClosed } from "react-icons/pi";
import  { useState } from 'react';
import propTypes from 'prop-types'

function Credential(props) {
  const {closeModal,handleSubmit}=props;
  const [ssid, setSSID] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () =>{
    setShowPassword(!showPassword);
  }

  const handleSSIDChange = (event) => {
    setSSID(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = () => {
    handleSubmit(ssid, password);
  };
  return (
    <div className="modal">
      <div className="hotspot-settings">
        <div className="cancel-contain">
          <div className="con"></div>
          <div className="cancel" onClick={closeModal}>
            <RxCross2 size="20" color="#D0FFFC" />
          </div>
        </div>
        <div className="SSID">
          <div className="txt">SSID:</div>
          <div className="input-space">
            <input
              className="input"
              type="text"
              id="ssidInput"
              value={ssid}
              onChange={handleSSIDChange}
            />
            <div className="space"></div>
          </div>
        </div>
        <div className="Password">
          <div className="txt">Key:</div>
          <div className="input-hidco">
            <input
              className="input"
              type={showPassword ? "password" : "text"}
              id="passwordInput"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="eye" onClick={togglePasswordVisibility}>
              {showPassword ? (
                <PiEye color="#03334E" size="20" />
              ) : (
                <PiEyeClosed size="20" color="#03334E" />
              )}
            </div>
          </div>
        </div>
        <div className="Submit" onClick={handleFormSubmit}>
          Submit
        </div>
      </div>
    </div>
  );
}

export default Credential;

Credential.propTypes = { closeModal:propTypes.func , handleSubmit:propTypes.func}
