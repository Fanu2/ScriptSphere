import dynamic from 'next/dynamic';

const CodeEditor = dynamic(() => import('../components/CodeEditor'), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <h1>Online Code Editor</h1>
      <CodeEditor />
    </div>
  );
}
