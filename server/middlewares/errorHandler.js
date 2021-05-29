function errorHandler(err, req, res, next){
  console.log(err.name, err.message)
    switch(err.name) {
        case 'SequelizeValidationError':
            const errorMessage = []
            if(err.errors.length > 0){
                err.errors.forEach(error => {
                    errorMessage.push(error.message)
                })
            }
            res.status(400).json({ error: errorMessage })
            break;

        case 'Bad Request':
            res.status(400).json({ error: [err.message] })
            break;
        
        case 'SequelizeDatabaseError': 
            res.status(400).json({ error: [err.message] })
            break;

        case 'JsonWebTokenError':
            res.status(401).json({ error: err.message })
            break;

        case 'SequelizeUniqueConstraintError':
            res.status(400).json({ error: err.message })
            break;

        case 'Unauthorized':
          res.status(401).json({ error: err.message })
          break;

        case 'UserNotFound':
          res.status(404).json({ error: err.message })
          break;

        case 'ItemNotFound':
          res.status(404).json({ error: err.message })
          break;

        case 'ShowcaseNotFound':
          res.status(404).json({ error: err.message })
          break;

        case 'MaximumStarredReached':
          res.status(401).json({ error: err.message })
          break;

        default:
            const status = err.status || 500
            const message = err.message || 'Internal Server Error'
            res.status(status).json({ error: message })
    }
}

module.exports = errorHandler