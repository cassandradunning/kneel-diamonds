
import { KneelDiamonds } from "./KneelDiamonds.js"


const mainContainer = document.querySelector("#container")

const renderAllHTML = () => {
    mainContainer.innerHTML = KneelDiamonds()
}

renderAllHTML()

/*
    When state changes for your application, you need to regenerate 
    the HTML to display the new state to the user.

    Which module currently is responsible for starting the process 
    of generating HTML? That's right, it's main.js.

    That means that the main module should listen for the stateChanged event. 
    When it is dispatched by the database module, the main module will generate 
    all the HTML again and display it.

*/

document.addEventListener("stateChanged", event => {
    console.log("State of data has changed. Regenerating HTML...")
    renderAllHTML()
})