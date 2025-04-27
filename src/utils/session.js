// Save token to localStorage
export const saveToken = (token) => {
    localStorage.setItem('authToken', token);
};

// Get token from localStorage
export const getToken = () => {
    return localStorage.getItem('authToken');
};

// Remove token from localStorage (e.g., on logout)
export const removeToken = () => {
    localStorage.removeItem('authToken');
};
