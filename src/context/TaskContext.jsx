import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Create context
const TaskContext = createContext();

// Sample initial tasks
const initialTasks = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Draft and submit the project proposal document',
    status: 'pending',
    priority: 'high',
    dueDate: '2023-12-31',
    createdAt: '2023-12-01'
  },
  {
    id: '2',
    title: 'Review team feedback',
    description: 'Go through team feedback and make necessary adjustments',
    status: 'completed',
    priority: 'medium',
    dueDate: '2023-12-15',
    createdAt: '2023-12-05'
  },
  {
    id: '3',
    title: 'Prepare presentation slides',
    description: 'Create presentation slides for the client meeting',
    status: 'pending',
    priority: 'high',
    dueDate: '2023-12-20',
    createdAt: '2023-12-10'
  }
];

/**
 * TaskProvider component for managing task state
 */
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', initialTasks);
  
  // Add a new task
  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setTasks([...tasks, newTask]);
    return newTask;
  };
  
  // Update an existing task
  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };
  
  // Delete a task
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };
  
  // Toggle task status
  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } 
        : task
    );
    setTasks(updatedTasks);
  };
  
  // Get a task by ID
  const getTask = (id) => {
    return tasks.find(task => task.id === id);
  };
  
  // Filter tasks by status, priority, or search term
  const filterTasks = (filters) => {
    let filteredTasks = [...tasks];
    
    if (filters.status) {
      filteredTasks = filteredTasks.filter(task => task.status === filters.status);
    }
    
    if (filters.priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
    }
    
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm) || 
        task.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return filteredTasks;
  };
  
  // Sort tasks by field
  const sortTasks = (tasksToSort, field, direction = 'asc') => {
    return [...tasksToSort].sort((a, b) => {
      if (field === 'dueDate') {
        const dateA = new Date(a[field]);
        const dateB = new Date(b[field]);
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        const valueA = a[field].toLowerCase();
        const valueB = b[field].toLowerCase();
        if (valueA < valueB) return direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return direction === 'asc' ? 1 : -1;
        return 0;
      }
    });
  };
  
  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    getTask,
    filterTasks,
    sortTasks
  };
  
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Custom hook to use the task context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;
