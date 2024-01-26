import { useState } from 'react'
import CanvasEditor from './Components/CanvasEditor';
import CanvasDisplay from './Components/CanvasDisplay'
import './index.css'
import './App.css'


function App() {
  const [canvasData, setCanvasData] = useState({})

  const handleCanvasData = (data) => {
    setCanvasData(data)
  }
  return (
    <div className='flex flex-row'>
     <CanvasDisplay canvasData={canvasData}></CanvasDisplay>
     <CanvasEditor onCanvasDataChange = {handleCanvasData}></CanvasEditor>
    </div>
  );
}

export default App;

