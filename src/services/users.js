const axios = require('axios')
const host = process.env.SERVER_URL

async function leaveInfo (name, email, phone) {
  console.log(host)
  const result = await axios.post(host, {
    email: email,
    phone: phone,
    name: name,
  })
  console.log(result)
}

module.exports = { leaveInfo }
