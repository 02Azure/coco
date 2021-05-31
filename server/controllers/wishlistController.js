const { WishlistItem, User } = require('../models')

class WishlistController {
  static async getAll(req, res, next) {
    let { userId } = req.query
    let wishlistItems = []

    try {
      if(userId === undefined) {
        wishlistItems = await WishlistItem.findAll({
          include: [{
            model: User,
            attributes: ["id", "username", "userImage"]
          }]
        })
      } else {
        let user = await User.findByPk(+userId || 0)

        if(user) {
          wishlistItems = await WishlistItem.findAll({
            where: { 
              UserId: userId
            },
            include: [{
              model: User,
              attributes: ["id", "username", "userImage"]
            }]
          })
        } else {
          throw { status: 404, message: 'User not found' }
        }
      }

      res.status(200).json(wishlistItems)
    }

    catch(err) {
      next(err)
    }
  }

  static async create(req, res, next) {
    let input = {
      UserId: +req.user.id,
      name: req.body.name || "",
      image: req.body.image || "",
      description: req.body.description || "",
      price: req.body.price || 0,
      tag: req.body.tag || ""
    }

    try {
      await WishlistItem.create(input)

      res.status(201).json({ msg: "WishlistItem has been succesfully created" })
    }

    catch(err) {
      next(err)
    }
  }

  static async getOne(req, res, next) {
    try {
      let wishlistItem = await WishlistItem.findByPk(+req.params.id, {
        include: [{
          model: User,
          attributes: ["id", "username", "userImage"]
        }]
      })

      if(!wishlistItem) {
        throw {
          name: "ItemNotFound",
          message: "WishlistItem not found"
        }
      }

      res.status(200).json(wishlistItem)
    }

    catch(err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    let input = {
      name: req.body.name || "",
      image: req.body.image || "",
      description: req.body.description || "",
      price: req.body.price || 0,
      tag: req.body.tag || ""
    }

    try {
      await WishlistItem.update(input, {
        where: {
          id: +req.params.id
        }
      })
      res.status(200).json({ msg: "WishlistItem has been successfully updated" })
    }

    catch(err) {
        /* istanbul ignore next */
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      await WishlistItem.destroy({
        where: {
          id: +req.params.id
        }
      })
      res.status(200).json({ msg: "Wishlist has been successfully deleted" })
    }

    catch(err) {
        /* istanbul ignore next */
      next(err)
    }
  }
}

module.exports = WishlistController