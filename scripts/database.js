/*

    This module contains all of the data, or state, for the
    application. It exports two functions that allow other
    modules to get copies of the state.

*/
const database = {
    //  will store the input that the user gives the application
    //  "In this application, when the user chooses one of the radio buttons, they are changing the state of the application."
    //  stored as an obj, not an array/string,number bc it is now data for the database (?)
    orderBuilder: {},

    styles: [
        { id: 1, style: "Classic", price: 500 },
        { id: 2, style: "Modern", price: 710 },
        { id: 3, style: "Vintage", price: 965 }
    ],
    sizes: [
        { id: 1, carets: 0.5, price: 405 },
        { id: 2, carets: 0.75, price: 782 },
        { id: 3, carets: 1, price: 1470 },
        { id: 4, carets: 1.5, price: 1997 },
        { id: 5, carets: 2, price: 3638 }
    ],
    metals: [
        { id: 1, metal: "Sterling Silver", price: 12.42 },
        { id: 2, metal: "14K Gold", price: 736.4 },
        { id: 3, metal: "24K Gold", price: 1258.9 },
        { id: 4, metal: "Platinum", price: 795.45 },
        { id: 5, metal: "Palladium", price: 1241.0 }
    ],
    customOrders: [
        {
            id: 1,
            metalId: 3,
            sizeId: 2,
            styleId: 3,
            timestamp: 1614659931693
        }
    ]
}

export const getMetals = () => {
    return database.metals.map(metal => ({...metal}))
}

export const getSizes = () => {
    return database.sizes.map(size => ({...size}))
}
export const getStyles = () => {
    return database.styles.map(style => ({...style}))
}
export const getOrders = () => {
    return database.customOrders.map(order => ({...order}))
}

/* 
    Also remember that no other modules are allowed to have direct access to the database. 
    That's why you have exported functions that return copies of the current state. Other modules 
    invoke those function to get state. 

    Now you need to export functions whose responsibility is to set state. 
*/

export const setMetal = (id) => {
    database.orderBuilder.metalId = id
}

export const setSize = (id) => {
    database.orderBuilder.sizeId = id
}

export const setStyle = (id) => {
    database.orderBuilder.styleId = id
}

/*
    When the user clicks on the Create Custom Order button in the application, 
    you need to store their choices permanently. This is where the customOrder state 
    comes into play. You will be adding objects to that state array.

    Since that's a new task that the application needs to perform, you need a function.
    The function's sole reponsiblity will be to take the temporary choices currently being 
    stored in the orderBuilder state object and make them permanent. 
 */

    export const addCustomOrder = () => {
        // Copy the current state of user choices
        const newOrder = {...database.orderBuilder}
    
        // Add a new primary key to the object
        const lastIndex = database.customOrders.length - 1
        newOrder.id = database.customOrders[lastIndex].id + 1
    
        // Add a timestamp to the order
        newOrder.timestamp = Date.now()
    
        // Add the new order object to custom orders state
        database.customOrders.push(newOrder)
    
        // Reset the temporary state for user choices
        database.orderBuilder = {}
    
        // Broadcast a notification that permanent state has changed
        document.dispatchEvent(new CustomEvent("stateChanged"))
    }