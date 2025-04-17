import jwt from 'jsonwebtoken';

export const verifytoken = (req, res, next) => {
    const authheader = req.headers.authorization;
    console.log("Auth header:", authheader);

    if (!authheader) {
        return res.status(401).json({ message: "Authorization token is missing" });
    }

    const token = authheader.split(" ")[1]; // Format: "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: "Token not found in authorization header" });
    }

    try {
        const decode = jwt.verify(token, "abc"); // Use the same secret as in login
        req.user = decode; // Attach decoded blog user to the request
        console.log("Decoded token:", decode);
        next(); // Pass control to the next middleware
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token", error: error.message });
        console.log("Token verification failed:", e.message);
    }
};
