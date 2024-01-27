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
    <div className='flex flex-col justify-center items-center lg:flex-row app-container'>
     <CanvasDisplay canvasData={canvasData} className="lg:w-1/2"></CanvasDisplay>
     <CanvasEditor onCanvasDataChange = {handleCanvasData} className="lg:w-1/2 w-full"></CanvasEditor>
    </div>
  );
}

export default App;

