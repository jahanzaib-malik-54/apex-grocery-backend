export const checkAdmin = (req, res, next) => {
    if (!req.user || (req.user.role !== "admin" && req.user.role !== "super-admin")) {
        return res.status(403).json({ message: "Access denied. You don't have the required role to continue." });
    }
    next(); // Proceed to the next middleware or route handler
};