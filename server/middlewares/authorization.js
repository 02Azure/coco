const { Showcase, Item, WishlistItem, ShowcaseItem } = require("../models")

async function authorize(req, res, next) {
  try {
    if(req.baseUrl.includes("showcases")) {
      let showcase = await Showcase.findByPk(+req.params.id)
  
      if(!showcase) throw {name: "ShowcaseNotFound", message: "Showcase not found"}
      if(showcase.UserId !== +req.user.id) throw { name: "Unauthorized", message: "You are not authorized to perform this action" }
      next()

    } else if(req.baseUrl.includes("showcaseitems")) {
      let showcaseItem = await ShowcaseItem.findByPk(+req.params.id, {
        include: Item
      }) 

      if(!showcaseItem) throw {name: "ItemNotFound", message: "Item not found"}
      if(showcaseItem.Item.UserId !== +req.user.id) throw { name: "Unauthorized", message: "You are not authorized to perform this action" }
      next()

    } else if(req.baseUrl.includes("items")) {
      let item = await Item.findByPk(+req.params.id)

      if(!item) throw {name: "ItemNotFound", message: "Item not found"}
      if(item.UserId !== +req.user.id) throw { name: "Unauthorized", message: "You are not authorized to perform this action" }
      next()

    } else if(req.baseUrl.includes("wishlist")) {
      let wishlistItem = await WishlistItem.findByPk(+req.params.id)

      if(!wishlistItem) throw {name: "ItemNotFound", message: "WishlistItem not found"}
      if(wishlistItem.UserId !== +req.user.id) throw { name: "Unauthorized", message: "You are not authorized to perform this action" }
      next()

    }

  }

  catch(err) {
    next(err)
  }
}

module.exports = authorize