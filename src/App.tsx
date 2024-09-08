import React, { useState } from 'react';
import { Layout, message, Upload, Button, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'; // Import axios
import Sidebar from './Sidebar'; // Import the Sidebar component
import Header from './Header'; // Import the Header component

const { Content, Sider } = Layout;
const { TextArea } = Input;

const App: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [draftText, setDraftText] = useState(''); // State for input text
  const [editorLLM, setEditorLLM] = useState('Llama');
  const [selectedTone, setSelectedTone] = useState('Neutral');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('California');
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission state
  const [outputMessage, setOutputMessage] = useState(''); // Test output message

  const handleUpload = (file: File) => {
    setPdfFile(file);
    message.success(`${file.name} uploaded successfully.`);
  };

  const handleRun = async () => {
    if (!pdfFile && !draftText.trim()) {
      message.error('Please upload a PDF file or enter the draft text.');
      return;
    }

    try {
      const formData = new FormData();

      if (pdfFile) {
        formData.append('file', pdfFile);
      }

      if (draftText) {
        formData.append('text', draftText);
      }

      formData.append('editorLLM', editorLLM);
      formData.append('tone', selectedTone);
      formData.append('jurisdiction', selectedJurisdiction);

      // Make the API call
      const response = await axios.post('/api/generate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Simulate a delay for testing
      setTimeout(() => {
        setOutputMessage(response.data.message || 'Your document has been processed successfully.');
        setIsSubmitted(true); // Switch to result view after submission
      }, 1000);
    } catch (error) {
      message.error('Error submitting the document. Please try again.');
    }
  };

  const handleUploadNewDocument = () => {
    setPdfFile(null);
    setDraftText('');
    setIsSubmitted(false); // Reset the state to go back to the initial upload view
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider
        width={300}
        style={{
          background: '#001529',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Sidebar
          editorLLM={editorLLM}
          setEditorLLM={setEditorLLM}
          selectedTone={selectedTone}
          setSelectedTone={setSelectedTone}
          selectedJurisdiction={selectedJurisdiction}
          setSelectedJurisdiction={setSelectedJurisdiction}
        />
      </Sider>

      {/* Main Layout */}
      <Layout style={{ backgroundColor: '#f0f2f5' }}>
        <Header /> {/* Include the Header */}

        <Content
          style={{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          {!isSubmitted ? (
            <>
              <h2 style={{ marginBottom: '16px', fontSize: '18px', color: '#001529' }}>
                Input the Draft Text or Upload a PDF
              </h2>

              {/* PDF Upload */}
              <Upload
                beforeUpload={(file) => {
                  handleUpload(file);
                  return false; // Prevents auto-upload
                }}
                showUploadList={{ showRemoveIcon: true }}
              >
                <Button
                  icon={<UploadOutlined />}
                  style={{
                    marginBottom: '16px',
                    backgroundColor: '#001529',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Upload Document
                </Button>
              </Upload>

              {/* Draft Text Input */}
              <TextArea
                rows={6}
                placeholder="Enter the draft text here..."
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '8px',
                  borderColor: '#d9d9d9',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#001529')}
                onBlur={(e) => (e.target.style.borderColor = '#d9d9d9')}
              />

              {/* Run Button */}
              <button
                style={{
                  marginTop: '24px',
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#333', // Dark gray background
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#555'; // Lighter gray on hover
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#333'; // Reset to original color
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }}
                onClick={handleRun}
              >
                Run
              </button>
            </>
          ) : (
            <>
              <h2 style={{ marginBottom: '16px', fontSize: '18px', color: '#001529' }}>
                Document Processed!
              </h2>
              <p>{outputMessage}</p>
              <Button
                onClick={handleUploadNewDocument}
                style={{
                  backgroundColor: '#001529',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s ease',
                }}
              >
                Upload New Document
              </Button>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
