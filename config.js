require('dotenv').config()

module.exports = {
    shopifyConfig: {
        baseUrl: process.env.SHOPIFY_BASE_URL,
        username: process.env.SHOPIFY_USERNAME,
        password: process.env.SHOPIFY_PASSWORD
    }
}