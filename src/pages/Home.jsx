import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import SearchBar from '../components/SearchBar';
import TaskTable from '../components/TaskTable';
import Pagination from '../components/Pagination';

/**
 * Home page component displaying task list with search and pagination
 */
const Home = () => {
  const { tasks, filterTasks } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  
  // Apply filters and update filtered tasks
  useEffect(() => {
    const filtered = filterTasks(filters);
    setFilteredTasks(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, tasks, filterTasks]);
  
  // Handle search/filter
  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
  };
  
  // Calculate pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
        <Link
          to="/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create New Task
        </Link>
      </div>
      
      {/* Search and filters */}
      <SearchBar onSearch={handleSearch} />
      
      {/* Task statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Tasks</h2>
          <p className="text-3xl font-bold text-blue-600">{tasks.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Pending</h2>
          <p className="text-3xl font-bold text-yellow-600">
            {tasks.filter(task => task.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Completed</h2>
          <p className="text-3xl font-bold text-green-600">
            {tasks.filter(task => task.status === 'completed').length}
          </p>
        </div>
      </div>
      
      {/* Task table */}
      <TaskTable tasks={currentTasks} />
      
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
