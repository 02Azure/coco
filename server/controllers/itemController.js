const { Item } = require('../models')

class itemController{
    static async getItems(req, res, next){
        try {
            const items = await Item.findAll({ where: { UserId: req.user.id }})
            res.status(200).json(items)
        } catch (err) {
            next(err)
        }
    }

    static async getItemById(req, res, next){
        try {
            const item = await Item.findByPk(req.params.id)
            if(!item){
                throw { status: 404, message: 'Item is not found!' }
            } else {
                res.status(200).json(item)
            }
        } catch (err) {
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
            const { name, image, tradeable, price, tradeWith, tag, description } = req.body
            const findItem = await Item.findByPk(req.params.id)

            if(!findItem){
                throw { status: 404, message: 'Item is not found' }
            } else {
                const updateItem = await Item.update({ name, image, tradeable, price, tradeWith, tag, description }, { where: { id: findItem.id }})
                res.status(200).json({ msg: "Item has been successfully updated" })
            }
        } catch (err) {
            next(err)
        }
    }

    static async patchItem(req, res, next){
        try {
            const { tradeable } = req.body
            const findItem = await Item.findByPk(req.params.id) 
            if(!findItem){
                throw { status: 404, message: 'Item is not found' }
            } else {
                const patchItem = await Item.update({ tradeable }, { where: { id: findItem.id }})
                res.status(200).json({ msg: "Item tradeable has been successfully updated" })
            }
        } catch (err) {
            
        }
    }

    static async deleteItem(req, res, next){
        try {
            const findItem = await Item.findByPk(req.params.id)

            if(!findItem){
                throw { status: 404, message: 'Item is not found' }
            } else {
                await Item.destroy({ where: { id: findItem.id }})
                res.status(200).json({ msg: 'Item has been successfully deleted' })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = itemController