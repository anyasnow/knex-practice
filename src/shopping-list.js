require('dotenv').config()
const knex = require('knex')
const ArticlesService = require('./shopping-list-service')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

// ArticlesService.getAllItems(knexInstance, 'shopping_list')
//     .then(() =>
//         ArticlesService.insertItem())