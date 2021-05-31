const { ShowcaseItem, Item, Showcase, User } = require("../models")

class showcaseItemController {
  static async getAll(req, res, next) {
    try {
      let showcaseItem = await ShowcaseItem.findAll({
        include: [{
          model: Item,
          include: [{
            model: User,
            attributes: ["id", "username", "userImage"]
          }]
        }]
      })

      res.status(200).json(showcaseItem)
    }

    catch(err) {
      /* istanbul ignore next */
      next(err)
    }
  }

  static async create(req, res, next) {
    let input = {
      ShowcaseId: +req.body.ShowcaseId,
      ItemId: +req.body.ItemId
    }

    try {
      let showcase = await Showcase.findByPk(input.ShowcaseId)
      let item = await Item.findByPk(input.ItemId)

      if(!showcase || !item) throw { status: 404, message: "That Item and/or Showcase is not found"}
      if(showcase.UserId !== +req.user.id || item.UserId !== +req.user.id) throw { status: 401, message: "You are not authorized to perform this action" }
    
      let checkShowcaseItem = await ShowcaseItem.findOne({
        where: {
          ItemId: input.ItemId
        }
      })

      if(checkShowcaseItem) throw { status: 400, message: "ShowcaseItem is already in another Showcase" }

      await ShowcaseItem.create(input)

      res.status(201).json({msg: "ShowcaseItem has been succesfully created"})
    }

    catch(err) {
      next(err)
    }
  }

  static async switchStarredStatus(req, res, next) {
    try {
      let foundShowcaseItem = await ShowcaseItem.findByPk(+req.params.id)
      let newStarredStatus = false

      if(!foundShowcaseItem.isStarred) {
        let starredShowcaseItems = await ShowcaseItem.findAll({
          where: {
            ShowcaseId: foundShowcaseItem.ShowcaseId,
            isStarred: true
          }
        })
      
        if(starredShowcaseItems.length >= 3) {
          throw {
            name: "MaximumStarredReached",
            message: "You can only have maximum 3 starred item in one showcase at the same time"
          }
        }
        newStarredStatus = true
      }

      await ShowcaseItem.update({isStarred: newStarredStatus}, {
        where: {
          id: +req.params.id
        }
      })

      res.status(200).json({ msg: "ShowcaseItem starred status has been successfully updated" })
    }

    catch(err) {
      next(err)
    }

  }

  static async delete(req, res, next) {
    try {
      await ShowcaseItem.destroy({
        where: {
          id: +req.params.id
        }
      })
      res.status(200).json({ msg: "ShowcaseItem has been successfully deleted" })
    }

    catch(err) {
      /* istanbul ignore next */
      next(err)
    }

  }
}

module.exports = showcaseItemController