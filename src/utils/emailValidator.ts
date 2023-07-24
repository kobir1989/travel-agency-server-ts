//email validator
export const isValidEmail = (email: string): boolean => {
  // Regular expression pattern for email validation
  const pattern = /^[\w.-]+@[\w.-]+\.\w+$/;

  // Use the test() method of the pattern to check if the email matches
  return pattern.test(email);
};
