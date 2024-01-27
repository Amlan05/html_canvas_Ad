import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';


const CanvasEditor = ({ onCanvasDataChange }) => {
  const [selectedColor, setSelectedColor] = useState('#0369A1');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorHistory, setColorHistory] = useState([]);
  const [imageName, setImageName] = useState('');
  const [canvasData, setCanvasData] = useState({});

  const passCompleteData = (e) => {
    if (e.target.name === 'img') {
      const file = e.target.files[0];
      setImageName(file.name)
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setCanvasData({ ...canvasData, [e.target.name]: imageUrl })
      }
    } else if (e.target.name === 'backColor') {
      const newColorHistory = [selectedColor, ...colorHistory.slice(0, 4)];
      setShowColorPicker(!showColorPicker)
      setColorHistory(newColorHistory);
      setCanvasData({ ...canvasData, [e.target.name]: selectedColor })
    } else {
      setCanvasData({ ...canvasData, [e.target.name]: e.target.value })
    }
  };

  const setColorHere = (color) => {
    setCanvasData({ ...canvasData, backColor: color });
    // onCanvasDataChange(canvasData)
  };

  
  useEffect(() => {
    onCanvasDataChange(canvasData);
    // console.log(canvasData)
  }, [canvasData, onCanvasDataChange]);

  return ( 
    <div className="lg:w-1/2 w-3/4 -2">
      <div className="text-center">
        <h2 className="text-blue-600 text-3xl mt-4">Ad customization</h2>
        <p className="text-gray-400">Customize your ad and get the accordingly</p>
      </div>
      {/* Edit contents */}
      <div className="text-center mt-6">
        <p className="border-t-4 lg:text-left text-blue-700">Edit Contents</p>
        <div>
          <form className="flex flex-col relative">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-2">
              <p className="mb-2 mt-2">Change the ad creative image:</p>
              <label htmlFor="upload" className="cursor-pointer bg-blue-500 text-white font-bold py-0.5 px-1 rounded mb-2 mt-2">
                Select File
              </label>
              <input type="file" accept="image/*" onChange={passCompleteData} id="upload" className="hidden" name="img" />
              <p>{imageName}</p>
            </div>
            <input
              type="text"
              className="border-2 w-3/4 mt-2 mb-2 rounded border-neutral-700 p-1"
              placeholder="Ad Content"
              name="adContent"
              onChange={passCompleteData}
            />
            <input
              type="text"
              className="border-2 w-3/4 mt-2 mb-2 rounded border-neutral-700 p-1"
              placeholder="CTA"
              name="cta"
              onChange={passCompleteData}
            />
            <p className="text-gray-400 text-left">Choose your color</p>
            <div className="flex items-center space-x-4">
              {colorHistory.map((color, index) => (
                <div
                  key={index}
                  className={`color-history-item w-8 h-8 rounded-full cursor-pointer  ${selectedColor === color ? ' border-blue-500 border-2' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setColorHere(color)
                    setSelectedColor(color)
                  }}
                ></div>
              ))}
              <button
                className="rounded-full bg-blue-500 text-white py-1 px-2.5"
                type="button"
                onClick={() => setShowColorPicker(!showColorPicker)}
              >
                +
              </button>
              {showColorPicker && (
                <button
                  className="rounded-full bg-green-500 text-white py-1 px-2.5 mr-auto"
                  type="button"
                  name="backColor"
                  onClick={passCompleteData}
                >
                  ✓
                </button>
              )}
            </div>
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-2">
                <SketchPicker
                  color={selectedColor || '#ffffff'}
                  onChange={(color) => setSelectedColor(color.hex)}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CanvasEditor;
