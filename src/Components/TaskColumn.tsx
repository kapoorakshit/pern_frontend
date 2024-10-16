import React, { useState } from 'react';
import { TaskCard } from './TaskCard';
import { ITask } from './Interfaces/ITask';
import DropArea from './DropArea';
import { deleteTask } from '../apiService/apiService';
import UpdateTaskModal from './UpdateTaskModal'; 
import ViewInfoModal from './ViewInfoModal'; 
export const TaskColumn: React.FC<{
  title: string;
  tasks: ITask[];
  status: string;
  setActiveCard: (task: ITask | null) => void;
  onDrop: (status: string, index: number) => void;
  fetchTasks: () => void; // Add fetchTasks prop
}> = ({ title, tasks, status, setActiveCard, onDrop, fetchTasks }) => {

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Manage update modal open/close state
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null); // Store task data to update
  const [isViewInfoModalOpen, setIsViewInfoModalOpen] = useState(false); // Manage view info modal open/close state
  const [taskToView, setTaskToView] = useState<ITask | null>(null); // Store task data to view

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
    setTaskToUpdate(task); 
    setIsUpdateModalOpen(true); 
  };

  const handleViewTaskDetails = (task: ITask) => {
    setTaskToView(task); // Set the task to view
    setIsViewInfoModalOpen(true); // Open the view info modal
  };

  const handleDrop = (index: number) => {
    onDrop(status, index);
  };

  const handleTaskUpdated = () => {
    fetchTasks(); // Refresh tasks after update
    setIsUpdateModalOpen(false); // Close update modal after update
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
            onUpdate={handleUpdateTask} // Pass the handleUpdateTask function to TaskCard
            onViewDetails={handleViewTaskDetails} // Pass the handleViewTaskDetails function to TaskCard
          />
          <DropArea onDrop={() => handleDrop(index + 1)} />
        </React.Fragment>
      ))}

      {/* Update Task Modal */}
      {taskToUpdate && (
        <UpdateTaskModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onTaskUpdated={handleTaskUpdated}
          taskData={taskToUpdate} // Pass the task data to the modal
        />
      )}

      {/* View Info Modal */}
      {taskToView && (
        <ViewInfoModal
          isOpen={isViewInfoModalOpen}
          onClose={() => setIsViewInfoModalOpen(false)}
          taskData={taskToView} // Pass the task data to the modal
        />
      )}
    </div>
  );
};
