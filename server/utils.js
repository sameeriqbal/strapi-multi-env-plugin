
const getSulg = function (pathname) {
    const x = pathname.split('/');
    return x[x.length - 2]
}
const filterObject = function (obj, toDelete) {
    Object.keys(obj).forEach(key => {

        if (toDelete == key) {
            delete obj[key];
        }

        if (typeof obj[key] === 'object' && obj[key] !== null && key !== 'media') {
            filterObject(obj[key], toDelete)
        }
    })
}
module.exports = {
    getSulg,
    filterObject
}