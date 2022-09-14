/**
 * Recursively traversing the path of object properties
 * as specified in props argument to get the inner most value
 */
const getNestedProp = (obj, props) => {
    let index = 0
    let currentValue = obj[props[index]]
    if (props.length > 1 && typeof currentValue === "object")
        return getNestedProp(currentValue, props.slice(index + 1))

    return currentValue
}

const setNestedProp = (obj, props, value) => {
    let index = 0
    let currentValue = obj[props[index]]
    if (props.length > 0 && typeof currentValue === "object") {
        return setNestedProp(currentValue, props.slice(index + 1), value)
    }
    obj[props[index]] = value
    return obj
}

module.exports = {
    getNestedProp,
    setNestedProp,
}
