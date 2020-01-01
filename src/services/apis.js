const axios = require('axios')
const token = $cookies.get('jwt_token')
const host = process.env.VUE_APP_SERVER_URL

var config = {
  headers: {
    'Authorization': 'bearer ' + token,
  },
}

async function importExtendPublicKey (extendPublicKey) {
  const result = await axios.post(host + '/api/user/import-master-pubkey', {
    public_key: extendPublicKey,
  }, config)
  return result.data
}

async function createApplication (appName) {
  const result = await axios.post(host + '/api/user/application/create', {
    name: appName,
  }, config)
  return result.data
}

async function getApplicationsList () {
  const result = await axios.get(host + '/api/user/application/list', config)
  return result.data
}

async function createOrder (partnerOrderId, amount, applicationId) {
  const result = await axios.post(host + '/api/user/order/create', {
    partner_order_id: partnerOrderId,
    amount: parseFloat(amount),
    application_id: applicationId,
  }, config)
  return result.data
}

async function getOrdersList (appId) {
  const result = await axios.get(host + '/api/user/order/list?app=' + appId, config)
  return result.data
}

async function getTransactionsByOrder (orderId) {
  const result = await axios.get(host + '/api/user/order/transactions?order_id=' + orderId, config)
  return result.data
}

async function getApplicationUtxos (appId) {
  const result = await axios.get(host + '/api/user/sweep-money?application_id=' + appId, config)
  return result.data
}

module.exports = {
  importExtendPublicKey,
  createApplication,
  getApplicationsList,
  createOrder,
  getOrdersList,
  getTransactionsByOrder,
  getApplicationUtxos,
}
