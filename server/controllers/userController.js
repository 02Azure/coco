const { User, Showcase, WishlistItem, ShowcaseItem } = require('../models')
const checkPassword = require('../helpers/checkHashedPassword')
const { generateToken } = require('../helpers/jwt')

class userController{
  static async register(req, res, next){
    try {
      const { username, email, password } = req.body

      const user = await User.create({ username, email, password })
      res.status(201).json({ id: user.id, email: user.email, username: user.username })

    } catch (err) {
      next(err ,"<<<")
    }
  }

  static async login(req, res, next){
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email }})

      if(!user){
        throw { status: 401, message: 'Incorrect email or password' }

      } else {
        const isPasswordMatch = checkPassword(password, user.password)

        if(!isPasswordMatch){
          throw { status: 401, message: 'Incorrect email or password' }

        } else {
          const token = generateToken({
            id: user.id,
            username: user.username,
            email: user.email
          })

          res.status(200).json({ id: user.id, email: user.email, username: user.username, image: user.userImage, access_token: token })
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async viewProfile(req, res, next){
    try {
      let user = await User.findByPk(+req.params.id, {
        include: {
          all: true,
          nested: true
        }
      })

      if(!user) throw { status: 404, message: "User not found"}

      let profile = {
        id: user.id,
        username: user.username,
        userDesc: user.userDesc,
        userImage: user.userImage,
        location: user.location,
        Showcases: user.Showcases,
        WishlistItems: user.WishlistItems
      }

      res.status(200).json(profile)

    } catch (err) {
      next(err)
    }
  }

  static async updateUser(req, res, next){
    try {
      const { userDesc, userImage, location } = req.body
      
      await User.update({ userDesc, userImage, location }, { where : { id: +req.user.id }})
      res.status(200).json({ msg: 'User profile has been successfully updated' })

    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController