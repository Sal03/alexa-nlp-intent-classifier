const { shopifyConfig } = require('../config');
const axios = require('axios').default;

class ShopifyServices{
    
    #client;

    constructor(config = shopifyConfig){
        const token = Buffer.from(`${config.username}:${config.password}`).toString('base64');
        this.#client = axios.create({
            baseURL: config.baseUrl,
            headers: {
                'Authorization': `Basic ${token}`,
                'Content-Type': 'application/json'
            }
          });
    }

    async getRecommendedProduct({ sinceId = '', limit = 1, fields = 'id,images,title,variants,tags'}){
        try {
            return (await this.#client.get(`/products.json?limit=${limit}&fields=${fields}&since_id=${sinceId}`)).data.products[0];
        } catch(e) {
            throw e;
        }
    }

    async placerOrder({items = []}){
        try {
            const data = JSON.stringify({
                order: {
                    line_items: items.map((el) => {
                        return {
                            variant_id: el.variants[0].id,
                            quantity: el.quantity
                        }
                    })
                }
            });
            return (await this.#client.post('/orders.json', data)).data.order;
        } catch(e) {
            throw e;
        }
    }

    async getCustomer({ email }){
        try {
            return (await this.#client.get(`/customers/search.json?query=email:${email}`)).data.customers[0];
        } catch(e) {
            throw e;
        }
    }

    async getOrders({ email }){
        try {
            const customer = await this.getCustomer({ email });
            return (await this.#client.get(`/customers/${customer.id}/orders.json`)).data.orders;
        } catch(e) {
            throw e;
        }
    }
}

module.exports = {
    Shopify: new ShopifyServices(),
}