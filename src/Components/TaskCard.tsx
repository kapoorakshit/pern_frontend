import React from 'react';
import { ITask } from './Interfaces/ITask';
import './TaskCard.css';
interface TaskCardProps {
  task: ITask;
  setActiveCard: (task: ITask | null) => void; // Added prop
  onDelete: (taskId: ITask) => void; // Added prop for delete
  onUpdate: (task: ITask) => void; // Added prop for update
  onViewDetails: (task: ITask) => void; 
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, setActiveCard, onDelete, onUpdate, onViewDetails }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', task.id.toString()); // Set task ID in the dataTransfer
    setActiveCard(task); // Set the active card to the current task
  };

  return (
    <article
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => setActiveCard(null)}
      className="task-card"
      style={{ backgroundColor: '#e0f7e3', padding: '16px', borderRadius: '8px', marginBottom: '10px' }} // Light green background and styles
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>Due: {task.dueDate}</small>
      <div className="task-card-buttons">
      <button onClick={() => onViewDetails(task)} className="task-button">View Details</button>
        <button onClick={() => onUpdate(task)} className={`task-button task-button-update`}>Update</button>
        <button onClick={() => onDelete(task)} className={`task-button task-button-delete`}>Delete</button>
      </div>
    </article>
  );
};
