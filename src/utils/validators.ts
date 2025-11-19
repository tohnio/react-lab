/**
 * Validation utility functions for form inputs
 */

/**
 * Check if a value is empty or only whitespace
 */
export const isEmpty = (value: string): boolean => {
  return !value || value.trim().length === 0;
};

/**
 * Validate required field
 */
export const validateRequired = (value: string, fieldName: string = 'This field'): string => {
  if (isEmpty(value)) {
    return `${fieldName} is required`;
  }
  return '';
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): string => {
  if (isEmpty(email)) {
    return 'Email is required';
  }

  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  return '';
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): string => {
  if (isEmpty(password)) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return 'Password must contain at least one number';
  }

  return '';
};

/**
 * Validate password confirmation matches
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): string => {
  if (isEmpty(confirmPassword)) {
    return 'Please confirm your password';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  return '';
};

/**
 * Validate minimum length
 */
export const validateMinLength = (value: string, minLength: number, fieldName: string = 'This field'): string => {
  if (isEmpty(value)) {
    return `${fieldName} is required`;
  }

  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters long`;
  }

  return '';
};

/**
 * Validate maximum length
 */
export const validateMaxLength = (value: string, maxLength: number, fieldName: string = 'This field'): string => {
  if (value.length > maxLength) {
    return `${fieldName} must not exceed ${maxLength} characters`;
  }

  return '';
};

/**
 * Validate username format
 */
export const validateUsername = (username: string): string => {
  if (isEmpty(username)) {
    return 'Username is required';
  }

  if (username.length < 3) {
    return 'Username must be at least 3 characters long';
  }

  if (username.length > 20) {
    return 'Username must not exceed 20 characters';
  }

  // Only allow alphanumeric characters, underscores, and hyphens
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (!usernameRegex.test(username)) {
    return 'Username can only contain letters, numbers, underscores, and hyphens';
  }

  return '';
};

/**
 * Validate phone number format (basic)
 */
export const validatePhone = (phone: string): string => {
  if (isEmpty(phone)) {
    return 'Phone number is required';
  }

  // Remove common formatting characters
  const cleanPhone = phone.replace(/[\s\-().]/g, '');

  // Check if it contains only digits and optional + at start
  const phoneRegex = /^\+?\d{10,15}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return 'Please enter a valid phone number';
  }

  return '';
};

/**
 * Validate URL format
 */
export const validateUrl = (url: string): string => {
  if (isEmpty(url)) {
    return 'URL is required';
  }

  try {
    new URL(url);
    return '';
  } catch {
    return 'Please enter a valid URL';
  }
};

/**
 * Validate numeric value
 */
export const validateNumber = (value: string, fieldName: string = 'This field'): string => {
  if (isEmpty(value)) {
    return `${fieldName} is required`;
  }

  if (isNaN(Number(value))) {
    return `${fieldName} must be a valid number`;
  }

  return '';
};

/**
 * Validate number range
 */
export const validateNumberRange = (
  value: string,
  min: number,
  max: number,
  fieldName: string = 'This field'
): string => {
  const numError = validateNumber(value, fieldName);
  if (numError) return numError;

  const num = Number(value);
  if (num < min || num > max) {
    return `${fieldName} must be between ${min} and ${max}`;
  }

  return '';
};

/**
 * Validate date format (YYYY-MM-DD)
 */
export const validateDate = (date: string): string => {
  if (isEmpty(date)) {
    return 'Date is required';
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return 'Please enter a valid date (YYYY-MM-DD)';
  }

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return 'Please enter a valid date';
  }

  return '';
};

/**
 * Compose multiple validators
 */
export const composeValidators = (...validators: Array<(value: string) => string>) => {
  return (value: string): string => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return '';
  };
};
