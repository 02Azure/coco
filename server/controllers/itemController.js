const { Item } = require('../models')

class itemController{
    static async getItems(req, res, next){
        try {
            const items = await Items.findAll({ where: { UserId: req.loggedUser.id }})
            res.status(200).json(items)
        } catch (err) {
            next(err)
        }
    }

    static async getItemById(req, res, next){
        try {
            const item = await Item.findByPk({ where: { id: req.params.id }})
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
            const newItem = { name, image, tradeable, price, tradeWith, tag, description, UserId: res.loggedUser.id }

            const item = await Item.create(newItem)
            res.status(201).json(item)
        } catch (err) {
            
        }
    }

    static async putItem(req, res, next){
        try {
            const { name, image, tradeable, price, tradeWith, tag, description } = req.body
            const findItem = await Item.findByPk(req.params.id)

            if(!findItem){
                throw { status: 404, message: 'Item is not found' }
            } else {
                const updateItem = await Item.update({ name, image, tradeable, price, tradeWith, tag, description }, { where: { id: findItem }})
                res.status(200).json(updateItem[1][0])
            }
        } catch (err) {
            next(err)
        }
    }

    static async patchItem(req, res, next){
        try {
            const { tradeable} = req.body
            const findItem = await Item.findByPk(req.params.id) 
            if(!findItem){
                throw { status: 404, message: 'Item is not found' }
            } else {
                const patchItem = await Item.update({ tradeable }, { where: { id: findItem }})
                res.status(200).json(patchItem[1][0])
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
                res.status(200).json({ message: 'Item success to updated' })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = itemController