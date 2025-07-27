import React, { useState, useRef } from 'react';
import Logo from './Logo.png';
import './App.css';

interface MetadataInfo {
  reusableFunctionCount: number;
  pomExamplesCount: number;
  htmlLength: number;
  executionTimeMs?: number;
}

function App() {
  const [html, setHtml] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<MetadataInfo | null>(null);
  const [uploadMode, setUploadMode] = useState<'paste' | 'upload'>('paste');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customPaths, setCustomPaths] = useState({
    reusableFunctionPath: '',
    pomPath: '',
    formName: ''
  });
  const [showCustomPaths, setShowCustomPaths] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setHtml(event.target.result as string);
        }
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult('');
    setError(null);
    setMetadata(null);
    
    if (uploadMode === 'paste' && !html.trim()) {
      setError('Please enter HTML code!');
      return;
    }
    
    if (uploadMode === 'upload' && !fileInputRef.current?.files?.length) {
      setError('Please select a file to upload!');
      return;
    }
    
    setLoading(true);
    
    try {
      let response;
      
      if (uploadMode === 'paste') {
        // Prepare request data
        const requestData: any = { html };
        
        // Always include form name if provided
        if (customPaths.formName) {
          requestData.formName = customPaths.formName;
        }
        
        // Add other custom paths if checkbox is checked
        if (showCustomPaths) {
          if (customPaths.reusableFunctionPath) {
            requestData.reusableFunctionPath = customPaths.reusableFunctionPath;
          }
          if (customPaths.pomPath) {
            requestData.pomPath = customPaths.pomPath;
          }
        }
        
        response = await fetch('http://localhost:5000/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData),
        });
      } else {
        // File upload mode
        const formData = new FormData();
        if (fileInputRef.current?.files?.[0]) {
          formData.append('file', fileInputRef.current.files[0]);
          
          // Always include form name if provided
          if (customPaths.formName) {
            formData.append('formName', customPaths.formName);
          }
          
          // Add other custom paths if checkbox is checked
          if (showCustomPaths) {
            if (customPaths.reusableFunctionPath) {
              formData.append('reusableFunctionPath', customPaths.reusableFunctionPath);
            }
            if (customPaths.pomPath) {
              formData.append('pomPath', customPaths.pomPath);
            }
          }
          
          response = await fetch('http://localhost:5000/api/generate', {
            method: 'POST',
            body: formData,
          });
        } else {
          throw new Error('No file selected');
        }
      }
      
      const data = await response.json();
      
      if (response.ok) {
        setResult(data.result || 'No result returned.');
        if (data.metadata) {
          setMetadata(data.metadata);
        }
      } else {
        // Handle detailed error messages from the server
        setError(data.message || data.error || 'An error occurred');
      }
    } catch (err: any) {
      console.error('Request error:', err);
      setError(`Error: ${err.message || 'Unknown error'}. Please check your network connection and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(result)
      .then(() => {
        alert('Code copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} className="App-logo" alt="logo" />
        <h1>EPICREUSE</h1>
        <p>Generate reusable functions for ERP automation from your HTML code</p>
        
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            {/* Form Name field using dedicated component */}
            <div style={{
              width: '100%',
              marginBottom: '1.5rem',
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '8px'
            }}>
              <label style={{
                display: 'block',
                color: '#333',
                marginBottom: '0.5rem',
                fontSize: '1.1rem',
                fontWeight: 600
              }}>Form Name:</label>
              <input 
                type="text"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  color: 'black',
                  height: '42px',
                  boxSizing: 'border-box'
                }}
                value={customPaths.formName}
                onChange={e => setCustomPaths({...customPaths, formName: e.target.value})}
                placeholder="Enter the form name to search for (e.g., APInvoice, PurchaseOrder)"
              />
            </div>
            
            <div className="upload-toggle">
              <button 
                type="button"
                className={uploadMode === 'paste' ? 'active' : ''} 
                onClick={() => setUploadMode('paste')}
              >
                Paste HTML
              </button>
              <button 
                type="button"
                className={uploadMode === 'upload' ? 'active' : ''} 
                onClick={() => setUploadMode('upload')}
              >
                Upload File
              </button>
            </div>
            
            {uploadMode === 'paste' ? (
              <textarea
                value={html}
                onChange={e => setHtml(e.target.value)}
                rows={10}
                placeholder="Paste your HTML code here..."
              />
            ) : (
              <div className="file-upload">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".html,.htm,.txt"
                />
                {html && <p className="file-preview">File content loaded ({html.length} characters)</p>}
              </div>
            )}
            
            <div className="custom-paths">
              <label>
                <input 
                  type="checkbox" 
                  checked={showCustomPaths} 
                  onChange={() => setShowCustomPaths(!showCustomPaths)} 
                />
                Custom paths (optional)
              </label>
              
              {/* Only show path fields when showCustomPaths is true */}
              {showCustomPaths && (
                <div className="paths-form">
                  <div className="form-group">
                    <label>Reusable Functions Path:</label>
                    <input 
                      type="text" 
                      value={customPaths.reusableFunctionPath}
                      onChange={e => setCustomPaths({...customPaths, reusableFunctionPath: e.target.value})}
                      placeholder="C:/CSF/erp-apps-aut/projects/workflows/src/CSF/ReusableFunctions"
                    />
                  </div>
                  <div className="form-group">
                    <label>POM Files Path:</label>
                    <input 
                      type="text" 
                      value={customPaths.pomPath}
                      onChange={e => setCustomPaths({...customPaths, pomPath: e.target.value})}
                      placeholder="C:/CSF/erp-apps-aut/projects/ui/src/UIApps"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="button-wrapper">
              <button type="submit" disabled={loading} className="primary-button">
                {loading ? 'Processing...' : '⚙️ Generate'}
              </button>
            </div>
          </form>
          
          {error && (
            <div className="error-message">
              <h3>Error:</h3>
              <p>{error}</p>
              {/* Show additional error details if available */}
              <div className="error-details">
                <p>Please try again with a different HTML input or check that your paths are correct.</p>
              </div>
            </div>
          )}
          
          {result && (
            <div className="result">
              <div className="result-header">
                <h3>Generated Functions:</h3>
                <button onClick={handleCopyToClipboard} className="copy-button">
                  📋 Copy Code
                </button>
              </div>
              
              {metadata && (
                <div className="metadata">
                  <p>Used {metadata.reusableFunctionCount} reusable function examples and {metadata.pomExamplesCount} POM files</p>
                  {metadata.executionTimeMs && (
                    <p>Generated in {(metadata.executionTimeMs / 1000).toFixed(2)} seconds</p>
                  )}
                  {metadata.htmlLength && (
                    <p>Processed {metadata.htmlLength} characters of HTML</p>
                  )}
                </div>
              )}
              
              <pre>{result}</pre>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;