

class showcaseController {
  static async getAll(req, res, next) {
    try {
      res.status(200).json({msg: "success showcase getAll"})
    }

    catch(err) {
      next(err)
    }

  }

  static async create(req, res, next) {
    try {
      res.status(201).json({msg: "success showcase create"})
    }

    catch(err) {
      next(err)
    }

  }

  static async getOne(req, res, next) {
    try {
      res.status(200).json({msg: "success showcase showOne"})
    }

    catch(err) {
      next(err)
    }

  }

  static async editName(req, res, next) {
    try {
      res.status(200).json({msg: "success showcase editName"})
    }

    catch(err) {
      next(err)
    }

  }

  static async delete(req, res, next) {
    try {
      res.status(200).json({msg: "success showcase delete"})
    }

    catch(err) {
      next(err)
    }

  }
}

module.exports = showcaseController