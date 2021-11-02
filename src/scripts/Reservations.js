import { deleteReservation, getClowns, getCompletedJobs, getReservations, sendCompletedJob } from "./dataAccess.js";

document.addEventListener("click", (clickDelete) => {
    if (clickDelete.target.id.startsWith("reservation--")) {
        const [, reservationId] = clickDelete.target.id.split("--")
        deleteReservation(parseInt(reservationId))
    }
}
)

document.addEventListener("change", (changeEvent) => {
    if (changeEvent.target.id === "clowns") {
        const [reservationId, clownId] = changeEvent.target.value.split("--")

        const newCompletedObj = {
            reservationId: parseInt(reservationId),
            clownId: parseInt(clownId),
            dateCreated: Date.now()
        }

        sendCompletedJob(newCompletedObj)
    }
}
)

const reservationListItems = (reservation) => {
    const clowns = getClowns()
    const completedJobs = getCompletedJobs()
    const isCompleted = completedJobs.find(completedJob => completedJob.reservationId === reservation.id)

    let html = ''

    if (isCompleted) {
        const foundClown = clowns.find(clown => isCompleted.clownId === clown.id)
        html += `<li id="completedJob-${reservation.id}">
        <div>Reservation placed by ${reservation.parentName} for ${reservation.childName}'s celebration on ${reservation.eventDate}.</div>
        <div> Completed by ${foundClown.name} </div>
        <button class="reservation__delete" id="reservation--${reservation.id}">
            Remove Record
        </button>
        
    </li>
`
    } else {
        html += `
    <li id="reservation-${reservation.id}">
        <div>Reservation placed by ${reservation.parentName} for ${reservation.childName}'s celebration on ${reservation.eventDate}.</div>
        <select class="clowns" id="clowns">
            <option value="">Choose</option>
            ${clowns.map(
            clown => {
                return `<option value="${reservation.id}--${clown.id}">${clown.name}</option>`
            }
        ).join("")
            }
        </select>
        <button class="reservation__delete" id="reservation--${reservation.id}">
            Deny
        </button>
        
    </li>
`}
    return html
}



export const reservationHTML = () => {
    const reservations = getReservations()
    //Sorts reservations by date
    reservations.sort((obj1, obj2) => {
        const dateValue1 = new Date(obj1.eventDate);
        const dateValue2 = new Date(obj2.eventDate);
        return dateValue1 - dateValue2
    });

    return `
    <ul>
        ${reservations.map(reservationListItems).join("")
        }
    </ul>
    `
}