export const isUser = (role) => role === 'consumer';


const allowedRoles = ['consumer', 'admin','super-admin'];
export const adminRoles = ['admin','super-admin'];

// Export as utility function to check role validity
export const isValidRole = (role) => {
    return allowedRoles.includes(role);
};

export const getDefaultRole = () => {
    return 'consumer';
};
export const isAdmin = (role) => adminRoles.includes(role);

export default allowedRoles;
