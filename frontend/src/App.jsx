import  { useState } from 'react';
import './App.css'
import { TbSettings2 } from "react-icons/tb";
import { MdWifiTethering } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { PiEye,PiEyeClosed } from "react-icons/pi";
import data from '../status.json';

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [ssid, setSSID] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('false');

  const togglePasswordVisibility = () =>{
    setShowPassword(!showPassword);
  }

  const handleSSIDChange = (event) => {
    setSSID(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = ()=>{
    // Send the data to the backend
    fetch('http://192.168.137.1:8000/update-credentials', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ssid, password }),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
      // You can add additional logic here based on the response from the server
  })
  .catch((error) => {
      console.error('Error:', error);
  });
  }
  


  const openModal = () =>{
    setModalOpen(true);
  }
  const closeModal = () =>{
    setModalOpen(false);
  }
  let wifi_count=0;
  for (let i=0; i<8; i++){
    let obj=Object.values(data.status[0].wifi_nodes[i])[0];
    
    if(obj=="connected"){
      wifi_count++;
    }
  }
  let lora_count=0;
  for (let i=0; i<8; i++){
    let obj=Object.values(data.status[1].lora_nodes[i])[0];
    
    if(obj=="connected"){
      lora_count++;
    }
  }
  
  return (
    <>
      <div className='main_screen'>
        <div className={isModalOpen? 'blur-background':'screen1'}>
        <div className="nr-5g">
          <div className="info-5g">
            <div className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 8 6" fill="none">
                <path d="M8 4.8V2.4H6.10526V3.6H6.73684V4.8H5.47368V1.2H8V0H5.47368C5.13867 0 4.81738 0.126428 4.5805 0.351472C4.34361 0.576516 4.21053 0.88174 4.21053 1.2V4.8C4.21053 5.11826 4.34361 5.42348 4.5805 5.64853C4.81738 5.87357 5.13867 6 5.47368 6H6.73684C7.07185 6 7.39314 5.87357 7.63003 5.64853C7.86692 5.42348 8 5.11826 8 4.8ZM2.94737 0H0V3V3.6H1.68421V4.8H0V6H2.31579C2.48329 6 2.64394 5.93679 2.76238 5.82426C2.88083 5.71174 2.94737 5.55913 2.94737 5.4V3C2.94737 2.84087 2.88083 2.68826 2.76238 2.57574C2.64394 2.46321 2.48329 2.4 2.31579 2.4H1.26316V1.2H2.94737V0Z" fill="#ACEEA7"/>
              </svg>
            </div>
            <div className="connect" style={{backgroundColor:(data.status[2].nr_5g=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
              {data.status[2].nr_5g=='unconnected' ? 'connect':'connected'}
            </div>
            <div className="info"></div>
          </div>
          <div className="set-hotspot">
            <div className="settings" onClick={openModal}>
              <TbSettings2 size="30" color='#FFFFFF'/>
            </div>
            <div className="hotspot">
              <MdWifiTethering size="30" color={data.status[3].hotspot=='on'? '#8BFF6D':'#FFFFFF'}/>
            </div>
          </div>
        </div>
        <div className="wifi-nodes">
          <div className="txt-rem">
            <div className="txt">wifi nodes</div>
            <div className="rem">rem: {8-wifi_count}</div>
          </div>
          <div className="nodes-divider">
            <div className="w-node1">
              <div className="node1" style={{backgroundColor:(data.status[0].wifi_nodes[0].node1=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.33409 0.893182C4.74545 1.30455 5 1.87273 5 2.5C5 3.12727 4.74545 3.69545 4.33409 4.10682L4.01364 3.78636C4.34318 3.45909 4.54545 3.00455 4.54545 2.5C4.54545 1.99773 4.34318 1.54091 4.01364 1.21364L4.33409 0.893182ZM3.69091 1.53636C3.93864 1.78409 4.09091 2.125 4.09091 2.5C4.09091 2.875 3.93864 3.21591 3.69091 3.46364L3.37045 3.14318C3.53409 2.97955 3.63636 2.75227 3.63636 2.5C3.63636 2.24773 3.53409 2.02045 3.37045 1.85682L3.69091 1.53636ZM2.72727 2.04545C2.84783 2.04545 2.96344 2.09334 3.04868 2.17859C3.13393 2.26383 3.18182 2.37945 3.18182 2.5C3.18182 2.62055 3.13393 2.73617 3.04868 2.82141C2.96344 2.90666 2.84783 2.95455 2.72727 2.95455C2.60672 2.95455 2.4911 2.90666 2.40586 2.82141C2.32062 2.73617 2.27273 2.62055 2.27273 2.5C2.27273 2.37945 2.32062 2.26383 2.40586 2.17859C2.4911 2.09334 2.60672 2.04545 2.72727 2.04545ZM2.38636 0C2.53706 0 2.68157 0.0598618 2.78813 0.166417C2.89468 0.272971 2.95455 0.417491 2.95455 0.568182V1.59091H2.5V0.681818H0.454545V4.09091H2.5V3.40909H2.95455V4.43182C2.95455 4.58251 2.89468 4.72703 2.78813 4.83358C2.68157 4.94014 2.53706 5 2.38636 5H0.568182C0.417491 5 0.272971 4.94014 0.166417 4.83358C0.0598618 4.72703 0 4.58251 0 4.43182V0.568182C0 0.417491 0.0598618 0.272971 0.166417 0.166417C0.272971 0.0598618 0.417491 0 0.568182 0H2.38636Z" fill="#03334E"/>
                </svg>
              </div>
              <div className="node2" style={{backgroundColor:(data.status[0].wifi_nodes[1].node2=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.33409 0.893182C4.74545 1.30455 5 1.87273 5 2.5C5 3.12727 4.74545 3.69545 4.33409 4.10682L4.01364 3.78636C4.34318 3.45909 4.54545 3.00455 4.54545 2.5C4.54545 1.99773 4.34318 1.54091 4.01364 1.21364L4.33409 0.893182ZM3.69091 1.53636C3.93864 1.78409 4.09091 2.125 4.09091 2.5C4.09091 2.875 3.93864 3.21591 3.69091 3.46364L3.37045 3.14318C3.53409 2.97955 3.63636 2.75227 3.63636 2.5C3.63636 2.24773 3.53409 2.02045 3.37045 1.85682L3.69091 1.53636ZM2.72727 2.04545C2.84783 2.04545 2.96344 2.09334 3.04868 2.17859C3.13393 2.26383 3.18182 2.37945 3.18182 2.5C3.18182 2.62055 3.13393 2.73617 3.04868 2.82141C2.96344 2.90666 2.84783 2.95455 2.72727 2.95455C2.60672 2.95455 2.4911 2.90666 2.40586 2.82141C2.32062 2.73617 2.27273 2.62055 2.27273 2.5C2.27273 2.37945 2.32062 2.26383 2.40586 2.17859C2.4911 2.09334 2.60672 2.04545 2.72727 2.04545ZM2.38636 0C2.53706 0 2.68157 0.0598618 2.78813 0.166417C2.89468 0.272971 2.95455 0.417491 2.95455 0.568182V1.59091H2.5V0.681818H0.454545V4.09091H2.5V3.40909H2.95455V4.43182C2.95455 4.58251 2.89468 4.72703 2.78813 4.83358C2.68157 4.94014 2.53706 5 2.38636 5H0.568182C0.417491 5 0.272971 4.94014 0.166417 4.83358C0.0598618 4.72703 0 4.58251 0 4.43182V0.568182C0 0.417491 0.0598618 0.272971 0.166417 0.166417C0.272971 0.0598618 0.417491 0 0.568182 0H2.38636Z" fill="#03334E"/>
                </svg>
              </div>
              <div className="node3" style={{backgroundColor:(data.status[0].wifi_nodes[2].node3=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.33409 0.893182C4.74545 1.30455 5 1.87273 5 2.5C5 3.12727 4.74545 3.69545 4.33409 4.10682L4.01364 3.78636C4.34318 3.45909 4.54545 3.00455 4.54545 2.5C4.54545 1.99773 4.34318 1.54091 4.01364 1.21364L4.33409 0.893182ZM3.69091 1.53636C3.93864 1.78409 4.09091 2.125 4.09091 2.5C4.09091 2.875 3.93864 3.21591 3.69091 3.46364L3.37045 3.14318C3.53409 2.97955 3.63636 2.75227 3.63636 2.5C3.63636 2.24773 3.53409 2.02045 3.37045 1.85682L3.69091 1.53636ZM2.72727 2.04545C2.84783 2.04545 2.96344 2.09334 3.04868 2.17859C3.13393 2.26383 3.18182 2.37945 3.18182 2.5C3.18182 2.62055 3.13393 2.73617 3.04868 2.82141C2.96344 2.90666 2.84783 2.95455 2.72727 2.95455C2.60672 2.95455 2.4911 2.90666 2.40586 2.82141C2.32062 2.73617 2.27273 2.62055 2.27273 2.5C2.27273 2.37945 2.32062 2.26383 2.40586 2.17859C2.4911 2.09334 2.60672 2.04545 2.72727 2.04545ZM2.38636 0C2.53706 0 2.68157 0.0598618 2.78813 0.166417C2.89468 0.272971 2.95455 0.417491 2.95455 0.568182V1.59091H2.5V0.681818H0.454545V4.09091H2.5V3.40909H2.95455V4.43182C2.95455 4.58251 2.89468 4.72703 2.78813 4.83358C2.68157 4.94014 2.53706 5 2.38636 5H0.568182C0.417491 5 0.272971 4.94014 0.166417 4.83358C0.0598618 4.72703 0 4.58251 0 4.43182V0.568182C0 0.417491 0.0598618 0.272971 0.166417 0.166417C0.272971 0.0598618 0.417491 0 0.568182 0H2.38636Z" fill="#03334E"/>
                </svg>
              </div>
              <div className="node4" style={{backgroundColor:(data.status[0].wifi_nodes[3].node4=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.33409 0.893182C4.74545 1.30455 5 1.87273 5 2.5C5 3.12727 4.74545 3.69545 4.33409 4.10682L4.01364 3.78636C4.34318 3.45909 4.54545 3.00455 4.54545 2.5C4.54545 1.99773 4.34318 1.54091 4.01364 1.21364L4.33409 0.893182ZM3.69091 1.53636C3.93864 1.78409 4.09091 2.125 4.09091 2.5C4.09091 2.875 3.93864 3.21591 3.69091 3.46364L3.37045 3.14318C3.53409 2.97955 3.63636 2.75227 3.63636 2.5C3.63636 2.24773 3.53409 2.02045 3.37045 1.85682L3.69091 1.53636ZM2.72727 2.04545C2.84783 2.04545 2.96344 2.09334 3.04868 2.17859C3.13393 2.26383 3.18182 2.37945 3.18182 2.5C3.18182 2.62055 3.13393 2.73617 3.04868 2.82141C2.96344 2.90666 2.84783 2.95455 2.72727 2.95455C2.60672 2.95455 2.4911 2.90666 2.40586 2.82141C2.32062 2.73617 2.27273 2.62055 2.27273 2.5C2.27273 2.37945 2.32062 2.26383 2.40586 2.17859C2.4911 2.09334 2.60672 2.04545 2.72727 2.04545ZM2.38636 0C2.53706 0 2.68157 0.0598618 2.78813 0.166417C2.89468 0.272971 2.95455 0.417491 2.95455 0.568182V1.59091H2.5V0.681818H0.454545V4.09091H2.5V3.40909H2.95455V4.43182C2.95455 4.58251 2.89468 4.72703 2.78813 4.83358C2.68157 4.94014 2.53706 5 2.38636 5H0.568182C0.417491 5 0.272971 4.94014 0.166417 4.83358C0.0598618 4.72703 0 4.58251 0 4.43182V0.568182C0 0.417491 0.0598618 0.272971 0.166417 0.166417C0.272971 0.0598618 0.417491 0 0.568182 0H2.38636Z" fill="#03334E"/>
                </svg>
              </div>
            </div>
            <div className="divider"></div>
            <div className="w-node2">
              <div className="node1" style={{backgroundColor:(data.status[0].wifi_nodes[4].node5=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.33409 0.893182C4.74545 1.30455 5 1.87273 5 2.5C5 3.12727 4.74545 3.69545 4.33409 4.10682L4.01364 3.78636C4.34318 3.45909 4.54545 3.00455 4.54545 2.5C4.54545 1.99773 4.34318 1.54091 4.01364 1.21364L4.33409 0.893182ZM3.69091 1.53636C3.93864 1.78409 4.09091 2.125 4.09091 2.5C4.09091 2.875 3.93864 3.21591 3.69091 3.46364L3.37045 3.14318C3.53409 2.97955 3.63636 2.75227 3.63636 2.5C3.63636 2.24773 3.53409 2.02045 3.37045 1.85682L3.69091 1.53636ZM2.72727 2.04545C2.84783 2.04545 2.96344 2.09334 3.04868 2.17859C3.13393 2.26383 3.18182 2.37945 3.18182 2.5C3.18182 2.62055 3.13393 2.73617 3.04868 2.82141C2.96344 2.90666 2.84783 2.95455 2.72727 2.95455C2.60672 2.95455 2.4911 2.90666 2.40586 2.82141C2.32062 2.73617 2.27273 2.62055 2.27273 2.5C2.27273 2.37945 2.32062 2.26383 2.40586 2.17859C2.4911 2.09334 2.60672 2.04545 2.72727 2.04545ZM2.38636 0C2.53706 0 2.68157 0.0598618 2.78813 0.166417C2.89468 0.272971 2.95455 0.417491 2.95455 0.568182V1.59091H2.5V0.681818H0.454545V4.09091H2.5V3.40909H2.95455V4.43182C2.95455 4.58251 2.89468 4.72703 2.78813 4.83358C2.68157 4.94014 2.53706 5 2.38636 5H0.568182C0.417491 5 0.272971 4.94014 0.166417 4.83358C0.0598618 4.72703 0 4.58251 0 4.43182V0.568182C0 0.417491 0.0598618 0.272971 0.166417 0.166417C0.272971 0.0598618 0.417491 0 0.568182 0H2.38636Z" fill="#03334E"/>
                </svg>
              </div>
              <div className="node2" style={{backgroundColor:(data.status[0].wifi_nodes[5].node6=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.33409 0.893182C4.74545 1.30455 5 1.87273 5 2.5C5 3.12727 4.74545 3.69545 4.33409 4.10682L4.01364 3.78636C4.34318 3.45909 4.54545 3.00455 4.54545 2.5C4.54545 1.99773 4.34318 1.54091 4.01364 1.21364L4.33409 0.893182ZM3.69091 1.53636C3.93864 1.78409 4.09091 2.125 4.09091 2.5C4.09091 2.875 3.93864 3.21591 3.69091 3.46364L3.37045 3.14318C3.53409 2.97955 3.63636 2.75227 3.63636 2.5C3.63636 2.24773 3.53409 2.02045 3.37045 1.85682L3.69091 1.53636ZM2.72727 2.04545C2.84783 2.04545 2.96344 2.09334 3.04868 2.17859C3.13393 2.26383 3.18182 2.37945 3.18182 2.5C3.18182 2.62055 3.13393 2.73617 3.04868 2.82141C2.96344 2.90666 2.84783 2.95455 2.72727 2.95455C2.60672 2.95455 2.4911 2.90666 2.40586 2.82141C2.32062 2.73617 2.27273 2.62055 2.27273 2.5C2.27273 2.37945 2.32062 2.26383 2.40586 2.17859C2.4911 2.09334 2.60672 2.04545 2.72727 2.04545ZM2.38636 0C2.53706 0 2.68157 0.0598618 2.78813 0.166417C2.89468 0.272971 2.95455 0.417491 2.95455 0.568182V1.59091H2.5V0.681818H0.454545V4.09091H2.5V3.40909H2.95455V4.43182C2.95455 4.58251 2.89468 4.72703 2.78813 4.83358C2.68157 4.94014 2.53706 5 2.38636 5H0.568182C0.417491 5 0.272971 4.94014 0.166417 4.83358C0.0598618 4.72703 0 4.58251 0 4.43182V0.568182C0 0.417491 0.0598618 0.272971 0.166417 0.166417C0.272971 0.0598618 0.417491 0 0.568182 0H2.38636Z" fill="#03334E"/>
                </svg>
              </div>
              <div className="node3" style={{backgroundColor:(data.status[0].wifi_nodes[6].node7=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.33409 0.893182C4.74545 1.30455 5 1.87273 5 2.5C5 3.12727 4.74545 3.69545 4.33409 4.10682L4.01364 3.78636C4.34318 3.45909 4.54545 3.00455 4.54545 2.5C4.54545 1.99773 4.34318 1.54091 4.01364 1.21364L4.33409 0.893182ZM3.69091 1.53636C3.93864 1.78409 4.09091 2.125 4.09091 2.5C4.09091 2.875 3.93864 3.21591 3.69091 3.46364L3.37045 3.14318C3.53409 2.97955 3.63636 2.75227 3.63636 2.5C3.63636 2.24773 3.53409 2.02045 3.37045 1.85682L3.69091 1.53636ZM2.72727 2.04545C2.84783 2.04545 2.96344 2.09334 3.04868 2.17859C3.13393 2.26383 3.18182 2.37945 3.18182 2.5C3.18182 2.62055 3.13393 2.73617 3.04868 2.82141C2.96344 2.90666 2.84783 2.95455 2.72727 2.95455C2.60672 2.95455 2.4911 2.90666 2.40586 2.82141C2.32062 2.73617 2.27273 2.62055 2.27273 2.5C2.27273 2.37945 2.32062 2.26383 2.40586 2.17859C2.4911 2.09334 2.60672 2.04545 2.72727 2.04545ZM2.38636 0C2.53706 0 2.68157 0.0598618 2.78813 0.166417C2.89468 0.272971 2.95455 0.417491 2.95455 0.568182V1.59091H2.5V0.681818H0.454545V4.09091H2.5V3.40909H2.95455V4.43182C2.95455 4.58251 2.89468 4.72703 2.78813 4.83358C2.68157 4.94014 2.53706 5 2.38636 5H0.568182C0.417491 5 0.272971 4.94014 0.166417 4.83358C0.0598618 4.72703 0 4.58251 0 4.43182V0.568182C0 0.417491 0.0598618 0.272971 0.166417 0.166417C0.272971 0.0598618 0.417491 0 0.568182 0H2.38636Z" fill="#03334E"/>
                </svg>
              </div>
              <div className="node4" style={{backgroundColor:(data.status[0].wifi_nodes[7].node8=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.33409 0.893182C4.74545 1.30455 5 1.87273 5 2.5C5 3.12727 4.74545 3.69545 4.33409 4.10682L4.01364 3.78636C4.34318 3.45909 4.54545 3.00455 4.54545 2.5C4.54545 1.99773 4.34318 1.54091 4.01364 1.21364L4.33409 0.893182ZM3.69091 1.53636C3.93864 1.78409 4.09091 2.125 4.09091 2.5C4.09091 2.875 3.93864 3.21591 3.69091 3.46364L3.37045 3.14318C3.53409 2.97955 3.63636 2.75227 3.63636 2.5C3.63636 2.24773 3.53409 2.02045 3.37045 1.85682L3.69091 1.53636ZM2.72727 2.04545C2.84783 2.04545 2.96344 2.09334 3.04868 2.17859C3.13393 2.26383 3.18182 2.37945 3.18182 2.5C3.18182 2.62055 3.13393 2.73617 3.04868 2.82141C2.96344 2.90666 2.84783 2.95455 2.72727 2.95455C2.60672 2.95455 2.4911 2.90666 2.40586 2.82141C2.32062 2.73617 2.27273 2.62055 2.27273 2.5C2.27273 2.37945 2.32062 2.26383 2.40586 2.17859C2.4911 2.09334 2.60672 2.04545 2.72727 2.04545ZM2.38636 0C2.53706 0 2.68157 0.0598618 2.78813 0.166417C2.89468 0.272971 2.95455 0.417491 2.95455 0.568182V1.59091H2.5V0.681818H0.454545V4.09091H2.5V3.40909H2.95455V4.43182C2.95455 4.58251 2.89468 4.72703 2.78813 4.83358C2.68157 4.94014 2.53706 5 2.38636 5H0.568182C0.417491 5 0.272971 4.94014 0.166417 4.83358C0.0598618 4.72703 0 4.58251 0 4.43182V0.568182C0 0.417491 0.0598618 0.272971 0.166417 0.166417C0.272971 0.0598618 0.417491 0 0.568182 0H2.38636Z" fill="#03334E"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="lora-nodes">
          <div className="txt-rem">
            <div className="txt">lora nodes</div>
            <div className="rem">rem: {8-lora_count}</div>
          </div>
          <div className="nodes-divider">
            <div className="l-node1">
              <div className="node1" style={{backgroundColor:(data.status[1].lora_nodes[0].node1=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.3 0.725L4.5 0.525C4.15 0.175 3.7 0 3.25 0C2.8 0 2.35 0.175 2 0.525L2.2 0.725C2.5 0.45 2.875 0.3 3.25 0.3C3.625 0.3 4 0.45 4.3 0.725ZM4.075 0.925C3.85 0.7 3.55 0.575 3.25 0.575C2.95 0.575 2.65 0.7 2.425 0.925L2.625 1.125C2.8 0.95 3.025 0.875 3.25 0.875C3.475 0.875 3.7 0.95 3.875 1.125L4.075 0.925ZM4 2.5H3.5V1.5H3V2.5H0.5C0.367392 2.5 0.240215 2.55268 0.146447 2.64645C0.0526784 2.74021 0 2.86739 0 3V4C0 4.13261 0.0526784 4.25979 0.146447 4.35355C0.240215 4.44732 0.367392 4.5 0.5 4.5H4C4.13261 4.5 4.25979 4.44732 4.35355 4.35355C4.44732 4.25979 4.5 4.13261 4.5 4V3C4.5 2.86739 4.44732 2.74021 4.35355 2.64645C4.25979 2.55268 4.13261 2.5 4 2.5ZM1.25 3.75H0.75V3.25H1.25V3.75ZM2.125 3.75H1.625V3.25H2.125V3.75ZM3 3.75H2.5V3.25H3V3.75Z" fill="#03334E"/>
                </svg>
              </div>
              <div className="node2" style={{backgroundColor:(data.status[1].lora_nodes[1].node2=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.3 0.725L4.5 0.525C4.15 0.175 3.7 0 3.25 0C2.8 0 2.35 0.175 2 0.525L2.2 0.725C2.5 0.45 2.875 0.3 3.25 0.3C3.625 0.3 4 0.45 4.3 0.725ZM4.075 0.925C3.85 0.7 3.55 0.575 3.25 0.575C2.95 0.575 2.65 0.7 2.425 0.925L2.625 1.125C2.8 0.95 3.025 0.875 3.25 0.875C3.475 0.875 3.7 0.95 3.875 1.125L4.075 0.925ZM4 2.5H3.5V1.5H3V2.5H0.5C0.367392 2.5 0.240215 2.55268 0.146447 2.64645C0.0526784 2.74021 0 2.86739 0 3V4C0 4.13261 0.0526784 4.25979 0.146447 4.35355C0.240215 4.44732 0.367392 4.5 0.5 4.5H4C4.13261 4.5 4.25979 4.44732 4.35355 4.35355C4.44732 4.25979 4.5 4.13261 4.5 4V3C4.5 2.86739 4.44732 2.74021 4.35355 2.64645C4.25979 2.55268 4.13261 2.5 4 2.5ZM1.25 3.75H0.75V3.25H1.25V3.75ZM2.125 3.75H1.625V3.25H2.125V3.75ZM3 3.75H2.5V3.25H3V3.75Z" fill="#03334E"/>
                </svg>
              </div>
              <div className="node3" style={{backgroundColor:(data.status[1].lora_nodes[2].node3=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.3 0.725L4.5 0.525C4.15 0.175 3.7 0 3.25 0C2.8 0 2.35 0.175 2 0.525L2.2 0.725C2.5 0.45 2.875 0.3 3.25 0.3C3.625 0.3 4 0.45 4.3 0.725ZM4.075 0.925C3.85 0.7 3.55 0.575 3.25 0.575C2.95 0.575 2.65 0.7 2.425 0.925L2.625 1.125C2.8 0.95 3.025 0.875 3.25 0.875C3.475 0.875 3.7 0.95 3.875 1.125L4.075 0.925ZM4 2.5H3.5V1.5H3V2.5H0.5C0.367392 2.5 0.240215 2.55268 0.146447 2.64645C0.0526784 2.74021 0 2.86739 0 3V4C0 4.13261 0.0526784 4.25979 0.146447 4.35355C0.240215 4.44732 0.367392 4.5 0.5 4.5H4C4.13261 4.5 4.25979 4.44732 4.35355 4.35355C4.44732 4.25979 4.5 4.13261 4.5 4V3C4.5 2.86739 4.44732 2.74021 4.35355 2.64645C4.25979 2.55268 4.13261 2.5 4 2.5ZM1.25 3.75H0.75V3.25H1.25V3.75ZM2.125 3.75H1.625V3.25H2.125V3.75ZM3 3.75H2.5V3.25H3V3.75Z" fill="#03334E"/>
                </svg>
              </div>
              <div className="node4" style={{backgroundColor:(data.status[1].lora_nodes[3].node4=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.3 0.725L4.5 0.525C4.15 0.175 3.7 0 3.25 0C2.8 0 2.35 0.175 2 0.525L2.2 0.725C2.5 0.45 2.875 0.3 3.25 0.3C3.625 0.3 4 0.45 4.3 0.725ZM4.075 0.925C3.85 0.7 3.55 0.575 3.25 0.575C2.95 0.575 2.65 0.7 2.425 0.925L2.625 1.125C2.8 0.95 3.025 0.875 3.25 0.875C3.475 0.875 3.7 0.95 3.875 1.125L4.075 0.925ZM4 2.5H3.5V1.5H3V2.5H0.5C0.367392 2.5 0.240215 2.55268 0.146447 2.64645C0.0526784 2.74021 0 2.86739 0 3V4C0 4.13261 0.0526784 4.25979 0.146447 4.35355C0.240215 4.44732 0.367392 4.5 0.5 4.5H4C4.13261 4.5 4.25979 4.44732 4.35355 4.35355C4.44732 4.25979 4.5 4.13261 4.5 4V3C4.5 2.86739 4.44732 2.74021 4.35355 2.64645C4.25979 2.55268 4.13261 2.5 4 2.5ZM1.25 3.75H0.75V3.25H1.25V3.75ZM2.125 3.75H1.625V3.25H2.125V3.75ZM3 3.75H2.5V3.25H3V3.75Z" fill="#03334E"/>
                </svg>
              </div>
            </div>
            <div className="divider"></div>
            <div className="l-node2">
              <div className="node1" style={{backgroundColor:(data.status[1].lora_nodes[4].node5=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.3 0.725L4.5 0.525C4.15 0.175 3.7 0 3.25 0C2.8 0 2.35 0.175 2 0.525L2.2 0.725C2.5 0.45 2.875 0.3 3.25 0.3C3.625 0.3 4 0.45 4.3 0.725ZM4.075 0.925C3.85 0.7 3.55 0.575 3.25 0.575C2.95 0.575 2.65 0.7 2.425 0.925L2.625 1.125C2.8 0.95 3.025 0.875 3.25 0.875C3.475 0.875 3.7 0.95 3.875 1.125L4.075 0.925ZM4 2.5H3.5V1.5H3V2.5H0.5C0.367392 2.5 0.240215 2.55268 0.146447 2.64645C0.0526784 2.74021 0 2.86739 0 3V4C0 4.13261 0.0526784 4.25979 0.146447 4.35355C0.240215 4.44732 0.367392 4.5 0.5 4.5H4C4.13261 4.5 4.25979 4.44732 4.35355 4.35355C4.44732 4.25979 4.5 4.13261 4.5 4V3C4.5 2.86739 4.44732 2.74021 4.35355 2.64645C4.25979 2.55268 4.13261 2.5 4 2.5ZM1.25 3.75H0.75V3.25H1.25V3.75ZM2.125 3.75H1.625V3.25H2.125V3.75ZM3 3.75H2.5V3.25H3V3.75Z" fill="#03334E"/>
                </svg>
              </div>
              <div className="node2" style={{backgroundColor:(data.status[1].lora_nodes[5].node6=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.3 0.725L4.5 0.525C4.15 0.175 3.7 0 3.25 0C2.8 0 2.35 0.175 2 0.525L2.2 0.725C2.5 0.45 2.875 0.3 3.25 0.3C3.625 0.3 4 0.45 4.3 0.725ZM4.075 0.925C3.85 0.7 3.55 0.575 3.25 0.575C2.95 0.575 2.65 0.7 2.425 0.925L2.625 1.125C2.8 0.95 3.025 0.875 3.25 0.875C3.475 0.875 3.7 0.95 3.875 1.125L4.075 0.925ZM4 2.5H3.5V1.5H3V2.5H0.5C0.367392 2.5 0.240215 2.55268 0.146447 2.64645C0.0526784 2.74021 0 2.86739 0 3V4C0 4.13261 0.0526784 4.25979 0.146447 4.35355C0.240215 4.44732 0.367392 4.5 0.5 4.5H4C4.13261 4.5 4.25979 4.44732 4.35355 4.35355C4.44732 4.25979 4.5 4.13261 4.5 4V3C4.5 2.86739 4.44732 2.74021 4.35355 2.64645C4.25979 2.55268 4.13261 2.5 4 2.5ZM1.25 3.75H0.75V3.25H1.25V3.75ZM2.125 3.75H1.625V3.25H2.125V3.75ZM3 3.75H2.5V3.25H3V3.75Z" fill="#03334E"/>
                </svg>
              </div>
              <div className="node3" style={{backgroundColor:(data.status[1].lora_nodes[6].node7=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.3 0.725L4.5 0.525C4.15 0.175 3.7 0 3.25 0C2.8 0 2.35 0.175 2 0.525L2.2 0.725C2.5 0.45 2.875 0.3 3.25 0.3C3.625 0.3 4 0.45 4.3 0.725ZM4.075 0.925C3.85 0.7 3.55 0.575 3.25 0.575C2.95 0.575 2.65 0.7 2.425 0.925L2.625 1.125C2.8 0.95 3.025 0.875 3.25 0.875C3.475 0.875 3.7 0.95 3.875 1.125L4.075 0.925ZM4 2.5H3.5V1.5H3V2.5H0.5C0.367392 2.5 0.240215 2.55268 0.146447 2.64645C0.0526784 2.74021 0 2.86739 0 3V4C0 4.13261 0.0526784 4.25979 0.146447 4.35355C0.240215 4.44732 0.367392 4.5 0.5 4.5H4C4.13261 4.5 4.25979 4.44732 4.35355 4.35355C4.44732 4.25979 4.5 4.13261 4.5 4V3C4.5 2.86739 4.44732 2.74021 4.35355 2.64645C4.25979 2.55268 4.13261 2.5 4 2.5ZM1.25 3.75H0.75V3.25H1.25V3.75ZM2.125 3.75H1.625V3.25H2.125V3.75ZM3 3.75H2.5V3.25H3V3.75Z" fill="#03334E"/>
                </svg>
              </div>
              <div className="node4" style={{backgroundColor:(data.status[1].lora_nodes[7].node8=='unconnected')? '#DAEDFF':'#8BFF6D'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 5 5" fill="none">
                  <path d="M4.3 0.725L4.5 0.525C4.15 0.175 3.7 0 3.25 0C2.8 0 2.35 0.175 2 0.525L2.2 0.725C2.5 0.45 2.875 0.3 3.25 0.3C3.625 0.3 4 0.45 4.3 0.725ZM4.075 0.925C3.85 0.7 3.55 0.575 3.25 0.575C2.95 0.575 2.65 0.7 2.425 0.925L2.625 1.125C2.8 0.95 3.025 0.875 3.25 0.875C3.475 0.875 3.7 0.95 3.875 1.125L4.075 0.925ZM4 2.5H3.5V1.5H3V2.5H0.5C0.367392 2.5 0.240215 2.55268 0.146447 2.64645C0.0526784 2.74021 0 2.86739 0 3V4C0 4.13261 0.0526784 4.25979 0.146447 4.35355C0.240215 4.44732 0.367392 4.5 0.5 4.5H4C4.13261 4.5 4.25979 4.44732 4.35355 4.35355C4.44732 4.25979 4.5 4.13261 4.5 4V3C4.5 2.86739 4.44732 2.74021 4.35355 2.64645C4.25979 2.55268 4.13261 2.5 4 2.5ZM1.25 3.75H0.75V3.25H1.25V3.75ZM2.125 3.75H1.625V3.25H2.125V3.75ZM3 3.75H2.5V3.25H3V3.75Z" fill="#03334E"/>
                </svg>
              </div>
            </div>
            </div>
        </div>
        </div>
      </div>
      {
        isModalOpen && (
          <div className="modal">
            <div className="hotspot-settings">
              <div className="cancel" onClick={closeModal}>
                <RxCross2 size='20' color='#D0FFFC'/>
                </div>
              <div className="SSID">
                <div className="txt">SSID:</div>
                <input
                  className="input"
                  type="text"
                  id="ssidInput"
                  value={ssid}
                  onChange={handleSSIDChange}
                 />
              </div>
              <div className="Password">
                <div className="txt">Key:</div>
                <div className="input-hidco">
                  <input 
                   className="input"
                    type={showPassword?'password':'text'}
                    id="passwordInput"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <div className="eye" onClick={togglePasswordVisibility}>
                  {showPassword ? <PiEye color='#03334E' size='20'/> : <PiEyeClosed size='20' color='#03334E'/>}
                  </div>
                </div>
              </div>
              <div className="Submit" onClick={handleSubmit}>Submit</div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default App

