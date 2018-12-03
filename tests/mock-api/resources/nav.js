const _ = require('lodash')

module.exports = {
    all: [
        {
            id: 1,
            name: 'home',
            title: '规划一张图',
            displayOrder:1,
            userId:1
        },
        {
            id: 2,
            name: 'about',
            title: '建面专题',
            displayOrder:2,
            userId:1
        },
        {
            id: 1,
            name: 'home',
            title: '规划一张图',
            displayOrder:1,
            userId:-1
        },
        {
            id: 2,
            name: 'about',
            title: '建面专题',
            displayOrder:2,
            userId:-1
        },
    ],
    findBy(propertyName, value) {
        const matched = this.all.filter(obj => obj[propertyName] === value)
        return this.json(matched)
    },
    json(nav) {
        return nav
    },
}
