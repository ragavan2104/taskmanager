import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';

/**
 * EditTask page component for updating existing tasks
 */
const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTask, updateTask } = useTasks();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch task data
  useEffect(() => {
    try {
      const taskData = getTask(id);
      if (taskData) {
        setTask(taskData);
      } else {
        setError('Task not found');
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (err) {
      setError('Error loading task');
    } finally {
      setLoading(false);
    }
  }, [id, getTask, navigate]);
  
  // Handle form submission
  const handleSubmit = (taskData) => {
    updateTask(id, taskData);
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">Loading task data...</p>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <p className="mt-2">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Task</h1>
        <p className="text-gray-600">Update the task information below.</p>
      </div>
      
      <TaskForm initialValues={task} onSubmit={handleSubmit} formType="edit" />
    </div>
  );
};

export default EditTask;
