module.exports = {
    getKey: (obj,val) => Object.keys(obj).find(key => obj[key] === val),
    thicknesses: {
        b: 'bold',
        m: 'medium',
        r: 'regular',
        l: 'ligth',
        a: 'all', // "All" thickness should be displayed in all categories
    },
    styles: {
        f: 'fill',
        s: 'stroke',
        a: 'all', // "All" style should be displayed in all categories 
    },
}