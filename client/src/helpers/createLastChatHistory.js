export default function createLastChatHistory(messages, loggedUsername) {
  let uniqueUser = [] 
  let userContacts = []

  //filter pesan yang hanya melibatkan user ini
  messages = messages.filter(message => {
    return ((message.from.username == loggedUsername) || (message.recipient.username == loggedUsername))
  })

  //mempermudah mengambil pesan terakhir
  messages.reverse()

  //buat array contact dari pesan terakhir dari/ke user yang unik pada loggedUser ini
  messages.forEach(message => {
    if(message.from.username !== loggedUsername) {
      if(uniqueUser.indexOf(message.from.username) < 0) {
        uniqueUser.push(message.from.username)
        userContacts.push({ 
          id: message.from.id, 
          username: message.from.username, 
          image: message.from.image,
          message: message.message, 
          timestamp: message.timestamp 
        })
      }
    }
    else {
      if(uniqueUser.indexOf(message.recipient.username) < 0) {
        uniqueUser.push(message.recipient.username)
        userContacts.push({ 
          id: message.recipient.id, 
          username: message.recipient.username,
          image: message.recipient.image, 
          message: message.message, 
          timestamp: message.timestamp 
        })
      }
    }
  })
  return userContacts

}