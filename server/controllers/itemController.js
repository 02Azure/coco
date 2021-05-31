const { Item } = require('../models')

class itemController{
    static async getItems(req, res, next){
        try {
            const items = await Item.findAll({ where: { UserId: req.user.id }})
            res.status(200).json(items)

        } catch (err) {
      /* istanbul ignore next */
            next(err)
        }
    }

    static async getItemById(req, res, next){
        try {
            const item = await Item.findByPk(req.params.id)
            res.status(200).json(item)

        } catch (err) {
      /* istanbul ignore next */
            next(err)
        }
    }

    static async postItem(req, res, next){
        try {
            const { name, image, tradeable, price, tradeWith, tag, description } = req.body
            const newItem = { name, image, tradeable, price, tradeWith, tag, description, UserId: req.user.id }

            await Item.create(newItem)
            res.status(201).json({ msg: "Item has been successfully created" })
        } catch (err) {
            next(err)
        }
    }

    static async putItem(req, res, next){
        try {
            const { name, image, price, tradeWith, tag, description } = req.body
            const updateItem = await Item.update({ name, image, price, tradeWith, tag, description }, { where: { id: +req.params.id }})
            res.status(200).json({ msg: "Item has been successfully updated" })

        } catch (err) {
            next(err)
        }
    }

    static async patchItem(req, res, next){
        try {
            const { tradeable } = req.body
            await Item.update({ tradeable }, { where: { id: +req.params.id }})
            res.status(200).json({ msg: "Item tradeable has been successfully updated" })
        } catch (err) {
            
        }
    }

    static async deleteItem(req, res, next){
        try {
            const findItem = await Item.findByPk(req.params.id)
            await Item.destroy({ where: { id: findItem.id }})
            res.status(200).json({ msg: 'Item has been successfully deleted' })

        } catch (err) {
      /* istanbul ignore next */
            next(err)
        }
    }
}

module.exports = itemController