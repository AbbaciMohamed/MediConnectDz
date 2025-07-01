import React, { useState, useRef, useEffect } from 'react';
import { Camera, MapPin, FileText, X, RotateCcw, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ScanHistory from './ScanHistory';

const DocumentScanner = () => {
  const { user } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');
  const [showHistory, setShowHistory] = useState(false);
  const [scanType, setScanType] = useState<'document' | 'receipt' | 'business_card' | 'other'>('document');
  const [showCamera, setShowCamera] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setShowCamera(true);
      }
    } catch (err: any) {
      setError('Error accessing camera: ' + err.message);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        setImage(dataUrl);
        stopCamera();
      }
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

    if (!user?.id) {
      setError('User not authenticated');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/scan/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image: image.split(',')[1], 
          location,
          scanType,
          userId: user.id
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError('Error scanning document: ' + data.message);
      } else {
        setScanResult(data.text);
        // Refresh scan history
        setShowHistory(true);
      }
    } catch (err: any) {
      setError('Error scanning document: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetScanner = () => {
    setImage(null);
    setLocation(null);
    setScanResult('');
    setError('');
    setScanType('document');
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Document Scanner</h1>
              <p className="text-primary-100 mt-1">Scan documents with AI-powered OCR</p>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              {showHistory ? 'Hide History' : 'View History'}
            </button>
          </div>
        </div>

        <div className="p-6">
          {showHistory ? (
            <ScanHistory userId={user?.id || ''} />
          ) : (
            <div className="space-y-6">
              {/* Scan Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Document Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'document', label: 'Document', icon: FileText },
                    { value: 'receipt', label: 'Receipt', icon: FileText },
                    { value: 'business_card', label: 'Business Card', icon: FileText },
                    { value: 'other', label: 'Other', icon: FileText }
                  ].map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setScanType(type.value as any)}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          scanType === type.value
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Camera Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Capture Document</h3>
                  {image && (
                    <button
                      onClick={resetScanner}
                      className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {!showCamera && !image && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Click the button below to start scanning</p>
                    <button
                      onClick={startCamera}
                      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Start Camera
                    </button>
                  </div>
                )}

                {showCamera && (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="border-2 border-white rounded-lg p-4">
                        <p className="text-white text-center">Position document within frame</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center space-x-4">
                      <button
                        onClick={captureImage}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Check className="w-4 h-4 inline mr-2" />
                        Capture
                      </button>
                      <button
                        onClick={stopCamera}
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4 inline mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <canvas ref={canvasRef} className="hidden" />

                {image && (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={image}
                        alt="Captured document"
                        className="w-full rounded-lg border"
                      />
                      <button
                        onClick={() => setImage(null)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Location Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Location (Optional)</h3>
                  {location && (
                    <span className="text-sm text-green-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Captured
                    </span>
                  )}
                </div>
                
                {!location ? (
                  <button
                    onClick={fetchLocation}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Get Current Location
                  </button>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      Location: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                    </p>
                  </div>
                )}
              </div>

              {/* Scan Button */}
              <button
                onClick={handleScan}
                disabled={!image || isLoading}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Scan Document'
                )}
              </button>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Scan Result */}
              {scanResult && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Extracted Text</h3>
                  <div className="bg-gray-50 border rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-900">{scanResult}</pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentScanner; 