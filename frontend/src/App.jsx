import { useState, useEffect } from "react";
import "./App.css";
import { TbSettings2 } from "react-icons/tb";
import lora from "../lora.json";
import ToggleSlider from "./Components/ToggleSlider/ToggleSlider";
import Node from "./Components/WifiNode/Node";
import LoraNode from "./Components/LoraNode/LoraNode";
import Credential from "./Components/Credential/Credential";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHotspotOn, setIsHotspotOn] = useState(false);
  const [isConnected,setIsConnected] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState({devices:Array.from({ length: 8 }, () =>({ status:'unconnected'}))})
  const [loraData, setLoraData]=useState([]);
  const ip = "http://localhost:8000";

  useEffect(()=>{
    const fetchStatus = async () => {
      try {
        const response = await fetch(`${ip}/status`);
        const data = await response.json();
        setIsConnected(data.isConnected);
      } catch (error) {
        console.error('Error fetching status:',error);
      }
    };
    setInterval(fetchStatus,3000);
  },[]);
  useEffect(()=>{
    const fetchLoraDevices = async () => {
      try{
        const response = await fetch(`${ip}/loraStatus`);
        const data = await response.json();
        let num=data.sensor_id;
        if(num.length>8){
       	   for(let i=9;i<num.length;i++){
       	       num.pop();
       	   }
        }
        
        num=num.reverse()
        
        console.log("43 ",num);
        setLoraData(num);
        
      } catch (error) {
        console.error('Error fetching status:',error)
      }
    };
    setInterval(fetchLoraDevices,3000);
  },[])
  useEffect(()=>{
    const fetchConnectedDevices = async () => {
      try {
        const response = await fetch(`${ip}/get-connectivity-status`);
        const dataConnected = await response.json();
        
        setDeviceStatus(dataConnected);
      } catch (error) {
        console.error('Error fetching data:',error);
      }
    }
    setInterval(fetchConnectedDevices,3000);
  },[]);

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
        if(data.result){
          setIsHotspotOn(!isHotspotOn);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleFormSubmit = (ssid, password) => {
    // if (!isHotspotOn) setIsHotspotOn(!isHotspotOn);
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
        if(data.result){
          setIsHotspotOn(!isHotspotOn)
        }
        setModalOpen(false);
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
    let obj = Object.values(deviceStatus.devices[i])[0];

    if (obj == "connected") {
      wifi_count++;
    }
  }
  let lora_count = 0;
  for (let i = 0; i < 8; i++) {
    if(typeof(loraData[i])=='string'){
    	lora_count++;
    }
  }
  console.log("127 ",lora_count);
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
                  !isConnected ? "#DAEDFF" : "#8BFF6D",
                }}
              >
                {isConnected ? "connected" : "connect"}
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
              {deviceStatus.devices.map((device, index) => (
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
              {loraData.map((e,index)=>(
                <LoraNode key={index} bgColor={(typeof(e) != 'string') ? '#DAEDFF' : '#8BFF6D'} id={typeof(e)=='string'?e:''}/>
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
