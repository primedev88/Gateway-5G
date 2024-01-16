import { useState } from "react";
import "./App.css";
import { TbSettings2 } from "react-icons/tb";
// import { RxCross2 } from "react-icons/rx";
// import { PiEye,PiEyeClosed } from "react-icons/pi";
import wifi from "../wifi.json";
import nr_5g from "../nr_5g.json";
import lora from "../lora.json";
import ToggleSlider from "./Components/ToggleSlider/ToggleSlider";
import Node from "./Components/WifiNode/Node";
import LoraNode from "./Components/LoraNode/LoraNode";
import Credential from "./Components/Credential/Credential";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHotspotOn, setIsHotspotOn] = useState(false);
  const ip = "http://localhost:8000";

  const toggleHotspot = () => {
    fetch(`${ip}/toggle-hotspot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isHotspotOn: !isHotspotOn }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setIsHotspotOn(!isHotspotOn);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleFormSubmit = (ssid, password) => {
    // Send the data to the backend
    if (!isHotspotOn) setIsHotspotOn(!isHotspotOn);
    fetch(`${ip}/update-credentials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ssid, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setModalOpen(false);
        // You can add additional logic here based on the response from the server
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  let wifi_count = 0;
  for (let i = 0; i < 8; i++) {
    let obj = Object.values(wifi.devices[i])[0];

    if (obj == "connected") {
      wifi_count++;
    }
  }
  let lora_count = 0;
  for (let i = 0; i < 8; i++) {
    let obj = Object.values(lora.devices[i])[0];

    if (obj == "connected") {
      lora_count++;
    }
  }

  return (
    <>
      <div className="main_screen">
        <div className={isModalOpen ? "blur-background" : "screen1"}>
          <div className="nr-5g">
            <div className="info-5g">
              <div className="logo"></div>
              <div
                className="connect"
                style={{
                  backgroundColor:
                    nr_5g.status == "unconnected" ? "#DAEDFF" : "#8BFF6D",
                }}
              >
                {nr_5g.status == "unconnected" ? "connect" : "connected"}
              </div>
              <div className="info"></div>
            </div>
            <div className="set-hotspot">
              <div className="settings" onClick={openModal}>
                <TbSettings2 size="30" color="#FFFFFF" />
              </div>
              <div className="hotspot">
                <ToggleSlider
                  isHotspotOn={isHotspotOn}
                  toggleHotspot={toggleHotspot}
                />
              </div>
            </div>
          </div>
          <div className="wifi-nodes">
            <div className="txt-rem">
              <div className="txt">wifi nodes</div>
              <div className="rem">rem: {8 - wifi_count}</div>
            </div>
            <div className="nodes-divider">
              {wifi.devices.map((device, index) => (
                <Node key={index} bgColor={(device.status === 'unconnected') ? '#DAEDFF' : '#8BFF6D'} />
              ))}
            </div>
          </div>
          <div className="lora-nodes">
            <div className="txt-rem">
              <div className="txt">lora nodes</div>
              <div className="rem">rem: {8 - lora_count}</div>
            </div>
            <div className="nodes-divider">
              {lora.devices.map((device,index)=>(
                <LoraNode key={index} bgColor={(device.status === 'unconnected') ? '#DAEDFF' : '#8BFF6D'}/>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Credential closeModal={closeModal} handleSubmit={handleFormSubmit} />
      )}
    </>
  );
};

export default App;
