import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';

/**
 * CreateTask page component for adding new tasks
 */
const CreateTask = () => {
  const { addTask } = useTasks();
  
  // Handle form submission
  const handleSubmit = (taskData) => {
    addTask(taskData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Task</h1>
        <p className="text-gray-600">Fill in the form below to create a new task.</p>
      </div>
      
      <TaskForm onSubmit={handleSubmit} formType="create" />
    </div>
  );
};

export default CreateTask;
