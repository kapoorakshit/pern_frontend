import React, { useState } from 'react';
import '../App.css';

const DropArea: React.FC<{ onDrop: () => void }> = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDrop();
    setShowDrop(false);
  };

  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      className={showDrop ? "drop_area" : "hide_drop"}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()} // Prevent default behavior to allow drop
    >
      DropArea
    </section>
  );
};

export default DropArea;
