require('dotenv').config()

const knex = require('knex');



const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

function getByText(searchTerm) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

// getByText()

function getPagination(page) {
    const productsPerPage = 6
    const offset = productsPerPage * (page - 1)
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

// getPagination(2)

function getDaysAgo(days) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('date_added', '<', knexInstance.raw(`now() - '${days} days'::INTERVAL`))
        .then(result => {
            console.log(result)
        })
}

// getDaysAgo(20)

function getTotalCost() {
    knexInstance
        .select('category')
        .sum('price')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })

}
getTotalCost()

