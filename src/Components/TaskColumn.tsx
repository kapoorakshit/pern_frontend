import React from 'react';
import { TaskCard } from './TaskCard';
import { ITask } from './Interfaces/ITask';
import DropArea from './DropArea';
import { deleteTask } from '../apiService/apiService';

export const TaskColumn: React.FC<{
  title: string;
  tasks: ITask[];
  status: string;
  setActiveCard: (task: ITask | null) => void;
  onDrop: (status: string, index: number) => void; 
  fetchTasks: () => void; // Add fetchTasks prop
}> = ({ title, tasks, status, setActiveCard, onDrop, fetchTasks }) => {
  
  const handleDeleteTask = async (task: ITask) => {
    const confirmed = window.confirm(`Are you sure you want to delete the task "${task.title}"?`);
    if (confirmed) {
      try {
        await deleteTask(task.id);
        console.log(`Task with ID: ${task.id} has been deleted.`);
        fetchTasks(); // Refresh tasks after deletion
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const handleUpdateTask = (task: ITask) => {
    console.log(`Updating task: ${JSON.stringify(task)}`);
  };

  const handleViewTaskDetails = (task: ITask) => {
    console.log(`Viewing details for task: ${JSON.stringify(task)}`);
  };

  const handleDrop = (index: number) => {
    onDrop(status, index);
  };

  return (
    <div className="task-column">
      <h2>{title}</h2>
      <DropArea onDrop={() => handleDrop(0)} />
      {tasks.map((task, index) => (
        <React.Fragment key={task.id}>
          <TaskCard 
            task={task} 
            setActiveCard={setActiveCard} 
            onDelete={handleDeleteTask} 
            onUpdate={handleUpdateTask} 
            onViewDetails={handleViewTaskDetails} 
          />
          <DropArea onDrop={() => handleDrop(index + 1)} />
        </React.Fragment>
      ))}
    </div>
  );
};
