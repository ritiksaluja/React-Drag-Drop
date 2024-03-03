import React, { useState } from 'react';
import './App.css';

function App() {
  const data = [
    {
      "id": 1,
      "date": "2024-03-01",
      "volume": 10,
      "weight": 5
    },
    {
      "id": 2,
      "date": "2024-03-02",
      "volume": 15,
      "weight": 7
    },
    {
      "id": 3,
      "date": "2024-03-03",
      "volume": 20,
      "weight": 9
    },
    {
      "id": 4,
      "date": "2024-03-04",
      "volume": 12,
      "weight": 6
    },
    {
      "id": 5,
      "date": "2024-03-05",
      "volume": 18,
      "weight": 8
    },
    {
      "id": 6,
      "date": "2024-03-06",
      "volume": 11,
      "weight": 5
    },
    {
      "id": 7,
      "date": "2024-03-07",
      "volume": 16,
      "weight": 7
    },
    {
      "id": 8,
      "date": "2024-03-08",
      "volume": 21,
      "weight": 9
    },
    {
      "id": 9,
      "date": "2024-03-09",
      "volume": 13,
      "weight": 6
    },
    {
      "id": 10,
      "date": "2024-03-10",
      "volume": 19,
      "weight": 8
    },
    {
      "id": 11,
      "date": "2024-03-11",
      "volume": 14,
      "weight": 6
    },
    {
      "id": 12,
      "date": "2024-03-12",
      "volume": 17,
      "weight": 7
    },
    {
      "id": 13,
      "date": "2024-03-13",
      "volume": 22,
      "weight": 10
    },
    {
      "id": 14,
      "date": "2024-03-14",
      "volume": 16,
      "weight": 8
    },
    {
      "id": 15,
      "date": "2024-03-15",
      "volume": 20,
      "weight": 9
    },
    {
      "id": 16,
      "date": "2024-03-16",
      "volume": 15,
      "weight": 7
    },
    {
      "id": 17,
      "date": "2024-03-17",
      "volume": 18,
      "weight": 8
    },
    {
      "id": 18,
      "date": "2024-03-18",
      "volume": 23,
      "weight": 10
    },
    {
      "id": 19,
      "date": "2024-03-19",
      "volume": 17,
      "weight": 7
    },
    {
      "id": 20,
      "date": "2024-03-20",
      "volume": 21,
      "weight": 9
    }
  ];
  

  const [drag, setDrag] = useState(data.map(item => ({ ...item, checked: false })));
  const [drop, setDrop] = useState([]);

  function handleDragStart(event, id, source) {
    event.dataTransfer.setData("id", id);
    event.dataTransfer.setData("source", source);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event, area) {
    event.preventDefault();
    const itemId = event.dataTransfer.getData("id");
    const source = event.dataTransfer.getData("source");
    const item = source === "drag" ? drag.find(item => item.id.toString() === itemId) : drop.find(item => item.id.toString() === itemId);
    if (item) {
      if (area === "drop" && source === "drag") {
        setDrop([...drop, { ...item, checked: false }]);
        setDrag(drag.filter(item => item.id.toString() !== itemId));
      } else if (area === "drag" && source === "drop") {
        setDrag([...drag, { ...item, checked: false }]);
        setDrop(drop.filter(item => item.id.toString() !== itemId));
      }
    }
  }

  function transferToRight() {
    const filteredDrag = drag.filter(item => !item.checked);
    const transferredItems = drag.filter(item => item.checked).map(item => ({ ...item, checked: false }));
    setDrag(filteredDrag);
    setDrop([...drop, ...transferredItems]);
  }

  function transferToLeft() {
    const filteredDrop = drop.filter(item => !item.checked);
    const transferredItems = drop.filter(item => item.checked).map(item => ({ ...item, checked: false }));
    setDrop(filteredDrop);
    setDrag([...drag, ...transferredItems]);
  }

  function handleCheckboxChange(id, area) {
    const updatedItems = area.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    if (area === drag) {
      setDrag(updatedItems);
    } else {
      setDrop(updatedItems);
    }
  }

  return (
    <div className='parent'>
      <div className='drag' onDrop={(event) => handleDrop(event, "drag")} onDragOver={(event) => handleDragOver(event)}>
        <div className='header'>
          <span>checked</span>
          <span>id</span>
          <span>date</span>
          <span>volume</span>
          <span>Weight</span>
        </div>
        {drag.map(item => (
          <div className='header' key={item.id} draggable onDragStart={(event) => handleDragStart(event, item.id, "drag")}>
            <span><input type="checkbox" checked={item.checked} onChange={() => handleCheckboxChange(item.id, drag)} /></span>
            <span>{item.id}</span>
            <span>{item.date}</span>
            <span>{item.volume}</span>
            <span>{item.weight}</span>
          </div>
        ))}
      </div>
      <div className='btn'>
        <span onClick={transferToLeft}>Left</span>
        <span onClick={transferToRight}>Right</span>
      </div>
      <div className='drop' onDrop={(event) => handleDrop(event, "drop")} onDragOver={(event) => handleDragOver(event)}>
        <div className='header'>
          <span>checked</span>
          <span>id</span>
          <span>date</span>
          <span>volume</span>
          <span>Weight</span>
        </div>
        {drop.map(item => (
          <div className='header' key={item.id} draggable onDragStart={(event) => handleDragStart(event, item.id, "drop")}>
            <span><input type="checkbox" checked={item.checked} onChange={() => handleCheckboxChange(item.id, drop)} /></span>
            <span>{item.id}</span>
            <span>{item.date}</span>
            <span>{item.volume}</span>
            <span>{item.weight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
