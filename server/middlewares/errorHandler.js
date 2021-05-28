function errorHandler(err, req, res, next){
    switch(err.name) {
        case 'SequelizeValidationError':
            const errorMessage = []
            if(err.errors.length > 0){
                err.errors.forEach(error => {
                    errorMessage.push(error.message)
                })
            }
            res.status(400).json({ message: errorMessage })
            break;

        case 'Bad Request':
            res.status(400).json({ message: [err.message] })
            break;
        
        case 'SequelizeDatabaseError': 
            res.status(400).json({ message: [err.message] })
            break;

        case 'JsonWebTokenError':
            res.status(400).json({ message: [err.message] })
            break;

        case 'SequelizeUniqueConstraintError':
            res.status(409).json({ message: [err.message] })
            break;
        
        default:
            const status = err.status || 500
            const message = err.message || 'Internal Server Error'
            res.status(status).json({ message })
    }
}

module.exports = errorHandler