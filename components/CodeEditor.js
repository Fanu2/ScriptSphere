import { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleRunCode = async () => {
    if (language === 'javascript') {
      try {
        const log = [];
        const originalLog = console.log;
        console.log = (message) => log.push(message);
        eval(code);
        console.log = originalLog;
        setOutput(log.join('\n'));
      } catch (error) {
        setOutput(error.message);
      }
    } else {
      // For Python, send code to the backend API
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });
      const data = await response.json();
      if (!response.ok) {
        setOutput(data.error || 'An error occurred');
      } else {
        setOutput(data.output);
      }
    }
  };

  return (
    <div>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
      <Editor
        height="50vh"
        language={language}
        value={code}
        onChange={setCode}
        theme="vs-dark"
      />
      <button onClick={handleRunCode}>Run Code</button>
      <pre>{output}</pre>
    </div>
  );
};

export default CodeEditor;
