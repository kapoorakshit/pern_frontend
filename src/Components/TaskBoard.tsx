// src/components/TaskBoard.tsx
import React, { useState, useEffect } from 'react';
import { ITask } from './Interfaces/ITask';
import { TaskColumn } from './TaskColumn';
import { getAllTasks } from '../apiService/apiService';
import './TaskBoard.css';
import AddTaskModal from './AddTaskModal';


const TaskBoard: React.FC = () => {
    const [activeCard, setActiveCard] = useState<ITask | null>(null);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  
    useEffect(() => {
      fetchTasks(); // Fetch tasks on component mount
    }, []);
  
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getAllTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
  
    const onDrop = (status: string, index: number) => {
      if (activeCard == null) {
        return;
      }
  
      const updatedTasks = tasks.map(task => 
        task.id === activeCard.id ? { ...task, status } : task
      );
  
      const [taskToMove] = updatedTasks.splice(updatedTasks.findIndex(task => task.id === activeCard.id), 1);
      updatedTasks.splice(index, 0, taskToMove);
      setTasks(updatedTasks);
      setActiveCard(null);
    };
  
    const taskStatus = {
      todo: tasks.filter(task => task.status === 'todo'),
      inProgress: tasks.filter(task => task.status === 'inProgress'),
      done: tasks.filter(task => task.status === 'done'),
    };
  
    return (
      <>
        <button className="add-task-button" onClick={() => setModalOpen(true)}>Add Task</button>
        <div className="task-board">
          <AddTaskModal 
            isOpen={isModalOpen} 
            onClose={() => setModalOpen(false)} 
            onTaskAdded={fetchTasks} 
          />
  
          <TaskColumn 
            title="To-Do" 
            tasks={taskStatus.todo} 
            status="todo" 
            setActiveCard={setActiveCard} 
            onDrop={onDrop} 
            fetchTasks={fetchTasks} // Pass fetchTasks
          />
          <TaskColumn 
            title="In Progress" 
            tasks={taskStatus.inProgress} 
            status="inProgress" 
            setActiveCard={setActiveCard} 
            onDrop={onDrop} 
            fetchTasks={fetchTasks} // Pass fetchTasks
          />
          <TaskColumn 
            title="Done" 
            tasks={taskStatus.done} 
            status="done" 
            setActiveCard={setActiveCard} 
            onDrop={onDrop} 
            fetchTasks={fetchTasks} // Pass fetchTasks
          />
        </div>
      </>
    );
  };
  
  export default TaskBoard;
  
