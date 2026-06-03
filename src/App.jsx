
import React, { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [nextlist, setNextlist] = useState([]);

  const handleAdd = () => {
    if (text.trim() === "") return;

    const newItem = {
      id: Date.now(),
      text: text,
    };

    setList([...list, newItem]);
    setText("");
  };

  const handleDelete = (id) => {
    const deletedItem = list.find((item) => item.id === id);

    setNextlist([...nextlist, deletedItem]);

    const updatedList = list.filter((item) => item.id !== id);

    setList(updatedList);
  };

  const handleUndo = (id) => {
    const undoItem = nextlist.find((item) => item.id === id);

    setList([...list, undoItem]);

    const updatedDeleted = nextlist.filter((item) => item.id !== id);

    setNextlist(updatedDeleted);
  };

  return (
    <>
      <h2>TODO TASK </h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter TOday task"
      />

      <button onClick={handleAdd}>Add</button>

      

      <ul>
        {list.map((a) => (
          <li key={a.id}>
            {a.text}

            <button onClick={() => handleDelete(a.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h3>Deleted Items</h3>

      <ul>
        {nextlist.map((item) => (
          <li key={item.id}>
            {item.text}

            <button onClick={() => handleUndo(item.id)}>
              Undo
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

