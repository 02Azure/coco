//model

class WishlistController {
  static async getAll(req, res, next) {
    try {
      res.status(200).json({msg: "success wishlist getAll"})
    }

    catch(err) {
      next(err)
    }

  }

  static async create(req, res, next) {
    try {
      res.status(201).json({msg: "success wishlist create"})
    }

    catch(err) {
      next(err)
    }

  }

  static async getOne(req, res, next) {
    try {
      res.status(200).json({msg: "success wishlist showOne"})
    }

    catch(err) {
      next(err)
    }

  }

  static async update(req, res, next) {
    try {
      res.status(200).json({msg: "success wishlist editName"})
    }

    catch(err) {
      next(err)
    }

  }

  static async switchStarredStatus(req, res, next) {
    try {
      res.status(200).json({msg: "success wishlist switchStarredStatus"})
    }

    catch(err) {
      next(err)
    }

  }

  static async delete(req, res, next) {
    try {
      res.status(200).json({msg: "success wishlist delete"})
    }

    catch(err) {
      next(err)
    }

  }
}

module.exports = WishlistController