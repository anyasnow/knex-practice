const ArticlesService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping list service object`, function() {
    let testDB

    let dummyData = [
        {
            id: 1,
            name: 'fish',
            price: '1.30',
            category: 'Snack',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z')
        },
        {
            id: 2,
            name: 'chicken',
            price: '10.00',
            category: 'Lunch',
            checked: true,
            date_added: new Date('2100-05-22T16:28:32.615Z')
        },
        {
            id: 3,
            name: 'beets',
            price: '8.49',
            category: 'Main',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z')
        },
        {
            id: 4,
            name: 'ribs',
            price: '0.50',
            category: 'Breakfast',
            checked: true,
            date_added: new Date('1919-12-22T16:28:32.615Z')
        }
    ]

    before(() => {
        testDB = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
    })

    before(() => testDB('shopping_list').truncate())
    afterEach(() => testDB('shopping_list').truncate())
    after(() => testDB.destroy())

    context(`Given that shopping_list has data`, () => {
        beforeEach(() => {
            return testDB.insert(dummyData).into('shopping_list')
        })

        it(`Gets shopping list data`, () => {
            return ArticlesService.getAllItems(testDB, 'shopping_list')
                .then(actual =>
                    expect(actual).to.eql(dummyData))
        })

        it(`deleteItem() deletes item from shopping_list`, () => {
            const itemId = 3
            return ArticlesService.deleteItem(testDB, 'shopping_list', itemId)
                .then(() => ArticlesService.getAllItems(testDB, 'shopping_list'))
                .then(allItems => {
                    const expected = dummyData.filter(item => item.id !== itemId)
                    expect(allItems).to.eql(expected)
                })
        })

        it(`getById() retrieves an item from shopping_list`, () => {
            const itemId = 3
            return ArticlesService.getById(testDB, 'shopping_list', itemId)
                .then(itemById => {
                    const expected = dummyData.filter(item => item.id === itemId)
                    expect([itemById]).to.eql(expected)
                })
        })

        it(`updateItem() updates an item from shopping_list`, () => {
            const idToUpdate = 3
            const newItemData = {
                name: 'rice',
                price: '328.49',
                category: 'Lunch',
                checked: true,
                date_added: new Date('1846-01-22T16:28:32.615Z')
            }
            return ArticlesService.updateItem(testDB, 'shopping_list', idToUpdate, newItemData)
                .then(() => ArticlesService.getById(testDB, 'shopping_list', idToUpdate))
                .then(item => {
                    expect(item).to.eql({
                        id: idToUpdate,
                        ...newItemData
                    })
                })
        })
    })

    context(`Given that shopping_list has no data`, () => {
        it(`getAllItems() resolves to an empty array`, () => {
            return ArticlesService.getAllItems(testDB, 'shopping_list')
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })
    })

    it(`insertItem() adds a new item to shopping_list`, () => {
        let newItem = {
            id: 5,
            name: 'fish',
            price: '1.30',
            category: 'Snack',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z')
        }
        return ArticlesService.insertItem(testDB, newItem, 'shopping_list')
            .then(actual => {
                expect(actual).to.eql([
                    {
                        id: 5,
                        name: 'fish',
                        price: '1.30',
                        category: 'Snack',
                        checked: false,
                        date_added: new Date('2029-01-22T16:28:32.615Z')
                    }
                ])
            })
    })

})