import React, { useState } from 'react';
import { Select, Slider, Typography } from 'antd';

const { Text } = Typography;

const editorOptions = [
  { value: 'claude-3.5', label: 'claude-3.5' },
  { value: 'gpt-4', label: 'gpt-4' },
  { value: 'google-gemini', label: 'google-gemini' },
];

const qaOptions = [
  { value: 'claude-3.5', label: 'claude-3.5' },
  { value: 'gpt-4', label: 'gpt-4' },
  { value: 'google-gemini', label: 'google-gemini' },
];

const authorOptions = [
  { value: 'Author-1', label: 'Author-1' },
  { value: 'Author-2', label: 'Author-2' },
  { value: 'Author-3', label: 'Author-3' },
];

// Slider Component
interface IconSliderProps {
  max: number;
  min: number;
  value: number;
  onChange: (value: number) => void;
}

const IconSlider: React.FC<IconSliderProps> = ({ max, min, value, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Slider
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        style={{ width: '100%' }}
      />
    </div>
  );
};

// Sidebar Component
const Sidebar: React.FC = () => {
  const [editorLLM, setEditorLLM] = useState('claude-3.5');
  const [qaLLM, setQaLLM] = useState('claude-3.5');
  const [refAuthor, setRefAuthor] = useState('Author-1');
  const [revisionTimes, setRevisionTimes] = useState(1);

  return (
    <div style={{ padding: '16px', backgroundColor: '#001529', color: '#fff', height: '100vh', overflowY: 'auto' }}>
      {/* Editor LLM Select */}
      <div style={{ marginBottom: '40px' }}>
        <Text style={{ color: '#fff', marginBottom: '8px', display: 'block' }}>Choose your Editor LLM:</Text>
        <Select
          value={editorLLM}
          style={{ width: '100%' }}
          onChange={setEditorLLM}
          options={editorOptions}
        />
        <Text style={{ color: '#fff', marginTop: '8px', display: 'block' }}>Selected: {editorLLM}</Text>
      </div>

      {/* QA LLM Select */}
      <div style={{ marginBottom: '40px' }}>
        <Text style={{ color: '#fff', marginBottom: '8px', display: 'block' }}>Choose your QA LLM:</Text>
        <Select
          value={qaLLM}
          style={{ width: '100%' }}
          onChange={setQaLLM}
          options={qaOptions}
        />
        <Text style={{ color: '#fff', marginTop: '8px', display: 'block' }}>Selected: {qaLLM}</Text>
      </div>

      {/* Reference Author Select */}
      <div style={{ marginBottom: '40px' }}>
        <Text style={{ color: '#fff', marginBottom: '8px', display: 'block' }}>Choose the reference author:</Text>
        <Select
          value={refAuthor}
          style={{ width: '100%' }}
          onChange={setRefAuthor}
          options={authorOptions}
        />
        <Text style={{ color: '#fff', marginTop: '8px', display: 'block' }}>Selected: {refAuthor}</Text>
      </div>

      {/* Revision Slider */}
      <div style={{ marginTop: '40px' }}>
        <p style={{ color: '#fff' }}>Select the maximum number of times to execute the revision:</p>
        <IconSlider min={1} max={3} value={revisionTimes} onChange={setRevisionTimes} />
        <Text style={{ color: '#fff', marginTop: '8px', display: 'block' }}>Selected Revision Count: {revisionTimes}</Text>
      </div>
    </div>
  );
};

export default Sidebar;
