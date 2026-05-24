
const auth = (req, res, next) => {

    const { token } = req.query;

    if (token !== "xyz123") {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }

    next();
};

export default auth;