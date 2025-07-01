import React, { useState, useEffect } from 'react';
import { Trash2, Eye, Calendar, MapPin } from 'lucide-react';

interface ScanDocument {
  _id: string;
  extractedText: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  scanType: string;
  confidence: number;
  createdAt: string;
}

interface ScanHistoryProps {
  userId: string;
}

const ScanHistory: React.FC<ScanHistoryProps> = ({ userId }) => {
  const [documents, setDocuments] = useState<ScanDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<ScanDocument | null>(null);

  useEffect(() => {
    fetchScanHistory();
  }, [userId]);

  const fetchScanHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/scan/history?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch scan history');
      }
      const data = await response.json();
      setDocuments(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      const response = await fetch(`/api/scan/document/${documentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete document');
      }

      // Remove the document from the list
      setDocuments(docs => docs.filter(doc => doc._id !== documentId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Scan History</h3>
        <span className="text-sm text-gray-500">{documents.length} documents</span>
      </div>

      {documents.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No scanned documents yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc._id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {doc.scanType}
                    </span>
                    <span className={`text-xs font-medium ${getConfidenceColor(doc.confidence)}`}>
                      {doc.confidence.toFixed(1)}% confidence
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-900 line-clamp-2 mb-2">
                    {doc.extractedText}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(doc.createdAt)}</span>
                    </div>
                    {doc.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>
                          {doc.location.latitude.toFixed(4)}, {doc.location.longitude.toFixed(4)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setSelectedDocument(doc)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteDocument(doc._id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document Detail Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Document Details</h3>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Extracted Text
                  </label>
                  <div className="bg-gray-50 p-3 rounded border text-sm whitespace-pre-wrap">
                    {selectedDocument.extractedText}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Scan Type
                    </label>
                    <p className="text-sm text-gray-900">{selectedDocument.scanType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confidence
                    </label>
                    <p className={`text-sm font-medium ${getConfidenceColor(selectedDocument.confidence)}`}>
                      {selectedDocument.confidence.toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                {selectedDocument.location && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedDocument.location.latitude.toFixed(6)}, {selectedDocument.location.longitude.toFixed(6)}
                    </p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Scanned On
                  </label>
                  <p className="text-sm text-gray-900">{formatDate(selectedDocument.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanHistory; 