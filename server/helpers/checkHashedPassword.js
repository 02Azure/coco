const bcrypt = require('bcrypt')

function checkPassword(plainPassword, encryptedPassword){
    return bcrypt.compare(plainPassword, encryptedPassword)
}

module.exports = checkPassword