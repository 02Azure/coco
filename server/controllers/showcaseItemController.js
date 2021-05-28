

class showcaseItemController {
  static async create(req, res, next) {
    try {
      res.status(201).json({msg: "success showcaseItem create"})
    }

    catch(err) {
      next(err)
    }

  }

  static async switchStarredStatus(req, res, next) {
    try {
      res.status(201).json({msg: "success wishlist create"})
    }

    catch(err) {
      next(err)
    }

  }

  static async delete(req, res, next) {
    try {
      res.status(200).json({msg: "success showcaseItem delete"})
    }

    catch(err) {
      next(err)
    }

  }
}

module.exports = showcaseItemController