const ArticlesService = {
    getAllItems(knex, table) {
        return knex.select('*').from(table)
    },
    
    insertItem(knex, newItem, table) {
        return knex
            .insert(newItem)
            .into(table)
            .returning('*')
            .then(insertedItem => {
                return insertedItem
            })
    },

    getById(knex, table, id) {
        return knex.from(table).select('*').where('id', id).first()
    },

    deleteItem(knex, table, id) {
        return knex
            .from(table)
            .where({ id })
            .delete()
    },

    updateItem(knex, table, id, newItemFields) {
        return knex
            .from(table)
            .where({ id })
            .update(newItemFields)
    },
}


module.exports = ArticlesService