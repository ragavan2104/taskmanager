import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { validateTaskForm } from '../utils/validation';

/**
 * TaskForm component for creating and editing tasks
 */
const TaskForm = ({ initialValues, onSubmit, formType = 'create' }) => {
  const navigate = useNavigate();
  
  // Default initial values
  const defaultValues = {
    title: '',
    description: '',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0]
  };
  
  // Use form hook
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues
  } = useForm(
    initialValues || defaultValues,
    validateTaskForm,
    (formData) => {
      onSubmit(formData);
      resetForm();
      navigate('/');
    }
  );
  
  // Update form values when initialValues changes
  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues, setValues]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              touched.title && errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {touched.title && errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>
        
        {/* Description field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              touched.description && errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          ></textarea>
          {touched.description && errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
        
        {/* Priority field */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={values.priority}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              touched.priority && errors.priority ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {touched.priority && errors.priority && (
            <p className="mt-1 text-sm text-red-600">{errors.priority}</p>
          )}
        </div>
        
        {/* Due date field */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={values.dueDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              touched.dueDate && errors.dueDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {touched.dueDate && errors.dueDate && (
            <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
          )}
        </div>
        
        {/* Form actions */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {formType === 'create' ? 'Create Task' : 'Update Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
