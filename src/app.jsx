import { useEffect, useState } from 'react';
import './app.css';
import axios from 'axios';

function App() {
  const [result, setResult] = useState("");

  useEffect(() => {
    axios.get("/api/test").then(response => {
      setResult(response.data.content);
    })
  }, []);

  return (
    <>
      <h1>Hello,world!</h1>
      <h2>API 요청 : {result}</h2>
    </>
  );
}

export default App;
