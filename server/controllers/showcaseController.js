const {Showcase} = require('../models')

class showcaseController {
  static async getAll(req, res, next) {
    try {
      let Showcases = await Showcase.findAll({where:{ UserId:req.body.id}})
      console.log(Showcases)
      res.status(200).json(Showcases)
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