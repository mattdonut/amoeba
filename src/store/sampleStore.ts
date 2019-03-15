import { AppState } from './app'

const initState: AppState = {
    evoStore: {
        allKeys: [0, 1, 2, 3, 4],
        0: {
            id: 0,
            name: 'Ameoba'
        },
        1: {
            id: 1,
            name: 'Bacteria',
            parentId: 0
        },
        2: {
            id: 2,
            name: 'Yeast',
            parentId: 0
        },
        3: {
            id: 3,
            name: 'Strep',
            parentId: 1
        },
        4: {
            id: 4,
            name: 'Yogurt',
            parentId: 1
        }
    }
}

export default initState