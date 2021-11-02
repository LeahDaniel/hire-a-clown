import { HireAClown } from "./HireAClown.js"
import { fetchData } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchData().then(
        () => {
            mainContainer.innerHTML = HireAClown()
        }
    )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)