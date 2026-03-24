
export const errorHandler = (err, req, res, next) => {
    try {
        let error = { ...err };

        error.message = err.message;
        console.error("\n" + err + "\n")
        console.log(error)
        res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error' })
    } catch (error) {
        next(error)
    }
}