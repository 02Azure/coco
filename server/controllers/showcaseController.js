const { Showcase, ShowcaseItem, User, Item } = require('../models')

class showcaseController {
  static async getAll(req, res, next) {
    let { userId } = req.query
    
    if(isNaN(+userId)) {
      userId = 0
    } else {
      userId = +userId
    }

    try {
      let user = await User.findByPk(userId)

      if(!user) {
        throw({
          name: "UserNotFound",
          message: "User not found"
        })
      }

      let showcases = await Showcase.findAll({
        where: { 
          UserId: userId
        },
        include: [{
          model: ShowcaseItem,
          include: Item
        }]
      })
      
      res.status(200).json(showcases)
    }

    catch(err) {
      next(err)
    }

  }

  static async create(req, res, next) {
    let input = {
      UserId: +req.user.id,
      name: req.body.name || ""
    }

    try {
      await Showcase.create(input)

      res.status(201).json({ msg: "Showcase has been succesfully created" })
    }

    catch(err) {
      next(err)
    }

  }

  static async getOne(req, res, next) {
    try {
      let showcase = await Showcase.findByPk(+req.params.id, {
        include: [{
          model: ShowcaseItem,
          include: Item
        }]
      })

      if(!showcase) {
        throw {
          name: "ShowcaseNotFound",
          message: "Showcase not found"
        }
      }
      res.status(200).json(showcase)
    }

    catch(err) {
      next(err)
    }

  }

  static async editName(req, res, next) {
    let input = {
      name: req.body.name || ""
    }

    try {
      await Showcase.update(input, {
        where: {
          id: +req.params.id
        }
      })

      res.status(200).json({ msg: "Showcase name has been successfully updated" })
    }

    catch(err) {
      next(err)
    }
  }

  static async switchStarredStatus(req, res, next) {
    try {
      let foundShowcase = await Showcase.findByPk(+req.params.id)
      let newStarredStatus = false

      if(!foundShowcase.isStarred) {
        let userStarredShowcases = await Showcase.findAll({
          where: {
            UserId: +req.user.id,
            isStarred: true
          }
        })

        if(userStarredShowcases.length >= 3) {
          throw {
            name: "MaximumStarredReached",
            message: "You can only have maximum 3 starred showcases at the same time"
          }
        }
        newStarredStatus = true
      } 

      await Showcase.update({isStarred: newStarredStatus}, {
        where: {
          id: +req.params.id
        }
      })

      res.status(200).json({ msg: "Showcase starred status has been successfully updated" })
    }

    catch(err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      await Showcase.destroy({
        where: {
          id: +req.params.id
        }
      })
      
      res.status(200).json({msg: "Showcase has been successfully deleted"})
    }

    catch(err) {
      /* istanbul ignore next */
      next(err)
    }

  }
}

module.exports = showcaseController