/**
 * Validates task form data
 * @param {Object} values - Form values to validate
 * @returns {Object} - Validation errors
 */
export const validateTaskForm = (values) => {
  const errors = {};

  // Title validation
  if (!values.title) {
    errors.title = 'Title is required';
  } else if (values.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  } else if (values.title.length > 50) {
    errors.title = 'Title must be less than 50 characters';
  }

  // Description validation
  if (!values.description) {
    errors.description = 'Description is required';
  } else if (values.description.length < 5) {
    errors.description = 'Description must be at least 5 characters';
  } else if (values.description.length > 200) {
    errors.description = 'Description must be less than 200 characters';
  }

  // Due date validation
  if (!values.dueDate) {
    errors.dueDate = 'Due date is required';
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(values.dueDate);
    
    if (selectedDate < today) {
      errors.dueDate = 'Due date cannot be in the past';
    }
  }

  // Priority validation
  if (!values.priority) {
    errors.priority = 'Priority is required';
  }

  return errors;
};

/**
 * Validates search form data
 * @param {Object} values - Form values to validate
 * @returns {Object} - Validation errors
 */
export const validateSearchForm = (values) => {
  const errors = {};
  
  if (values.searchTerm && values.searchTerm.length < 2) {
    errors.searchTerm = 'Search term must be at least 2 characters';
  }
  
  return errors;
};
