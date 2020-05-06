export const ItemLimit = 12;
export const getPaginatedContent = (pageNr: number) => {
    const baseNumber = (pageNr - 1) * 12
    const arr = []
    for (let i = 1; i <= ItemLimit; i++) {
        arr.push(baseNumber + i)
    }
    return arr;
}
