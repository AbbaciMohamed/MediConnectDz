import React, { useState } from 'react';

const DocumentScanner = () => {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState('');

  const captureImage = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setImage(dataUrl);
      }

      stream.getTracks().forEach(track => track.stop());
    } catch (err: any) {
      setError('Error accessing camera: ' + err.message);
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (err: any) => setError('Error fetching location: ' + err.message)
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleScan = async () => {
    if (!image) {
      setError('No image captured');
      return;
    }
    try {
      const res = await fetch('/api/scan/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: image.split(',')[1], location })
      });
      const data = await res.json();
      if (!res.ok) {
        setError('Error scanning document: ' + data.message);
      } else {
        console.log('Scanned text:', data.text);
      }
    } catch (err: any) {
      setError('Error scanning document: ' + err.message);
    }
  };

  return (
    <div>
      <button onClick={captureImage}>Capture Image</button>
      <button onClick={fetchLocation}>Fetch Location</button>
      <button onClick={handleScan}>Scan Document</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default DocumentScanner; 