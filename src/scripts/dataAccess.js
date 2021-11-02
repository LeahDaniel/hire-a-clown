const appState = {
    reservations: [],
    clowns: [],
    completedJobs: []
}

const API = "http://localhost:8088"
const mainContainer = document.querySelector("#container")

export const getReservations = () => {
    return appState.reservations.map(reservation => ({ ...reservation }))
}

export const getClowns = () => {
    return appState.clowns.map(clown => ({ ...clown }))
}

export const getCompletedJobs = () => {
    return appState.completedJobs.map(job => ({ ...job }))
}



export const fetchData = () => {
    fetch(`${API}/reservations`)
        .then(response => response.json())
        .then(
            (reservationsAPI) => {
                // Store the external state in application state
                appState.reservations = reservationsAPI
            }
        )
    fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (clownsAPI) => {
                // Store the external state in application state
                appState.clowns = clownsAPI
            }
        )
    return fetch(`${API}/completedJobs`)
    .then(response => response.json())
    .then(
        (completedJobsAPI) => {
            // Store the external state in application state
            appState.completedJobs = completedJobsAPI
        }
    )
}

export const sendReservation = (reservation) => {
    const fetchOptions = {
        method: "POST",
        //? What are the headers and body doing below? //
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservation)
    }


    return fetch(`${API}/reservations`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })

}

export const sendCompletedJob = (completedJob) => {
    const fetchOptions = {
        method: "POST",
        //? What are the headers and body doing below? //
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedJob)
    }


    return fetch(`${API}/completedJobs`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })

}

export const deleteReservation = (id) => {
    console.log(`Deleting reservation ${id}`)
    return fetch(`${API}/reservations/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}