

import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function generateWiFiString(ssid, password) {
  return `WIFI:T:WPA;S:${ssid};P:${password};;`;
}

export default function App() {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const qrRef = useRef(null);

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wifi-qr-code.png';
    link.click();
  };

  const wifiString = generateWiFiString(ssid, password);

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <div ref={qrRef} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
        <QRCodeCanvas value={wifiString} size={256} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#fff' }}>
        <h2>WiFi QR Code Generator</h2>
        <input
          type="text"
          placeholder="WiFi SSID"
          value={ssid}
          onChange={e => setSsid(e.target.value)}
          style={{ margin: '10px', padding: '10px', width: '80%' }}
        />
        <input
          type="password"
          placeholder="WiFi Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ margin: '10px', padding: '10px', width: '80%' }}
        />
        <button onClick={handleDownload} style={{ margin: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Download QR Code
        </button>
      </div>
    </div>
  );
}
