import React from 'react';
import { ITask } from './Interfaces/ITask';


interface ViewInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskData: ITask | null;
}

const ViewInfoModal: React.FC<ViewInfoModalProps> = ({ isOpen, onClose, taskData }) => {
  if (!taskData) return null;

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Task Details</h2>
        <div className="task-info">
          <p><strong>Title:</strong> {taskData.title}</p>
          <p><strong>Description:</strong> {taskData.description}</p>
          <p><strong>Status:</strong> {taskData.status}</p>
          <p><strong>Due Date:</strong> {new Date(taskData.dueDate).toLocaleString()}</p>
          <p><strong>Created At:</strong> {new Date(taskData.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewInfoModal;
