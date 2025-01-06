exports.VerifyTokenPath = (req, res) => {
    try {
        if (req.user) {
            return res.status(200).json({ 
                success: true,
                user: req.user 
            });
        }
        
        return res.status(401).json({ 
            success: false,
            message: 'Invalid or expired token' 
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error during token verification'
        });
    }
};