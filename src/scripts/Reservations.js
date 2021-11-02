import { deleteReservation, getClowns, getReservations, sendCompletedJob } from "./dataAccess.js";

document.addEventListener("click", (clickDelete) => {
    if (clickDelete.target.id.startsWith("reservation--")) {
        const [, reservationId] = clickEvent.target.id.split("--")
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
    const clowns= getClowns()
    return `
    <li id="reservation-${reservation.id}">
        <div>Reservation placed by ${reservation.parentName} for ${reservation.childName}'s celebration on ${reservation.eventDate}.</div>
        <select class="clowns" id="clowns">
            <option value="">Choose</option>
            ${
                clowns.map(
                    clown => {
                        return `<option value="${reservation.id}--${clown.id}">${clown.name}</option>`
                    }
                ).join("")
            }
        </select>
        <button class="reservation__delete"
                id="reservation--${reservation.id}">
            Deny
        </button>
        
    </li>
`
}



export const reservationHTML = () => {
    const reservations = getReservations()
    reservations.sort((obj1, obj2) => {
        const dateValue1 = new Date(obj1.eventDate);
        const dateValue2 = new Date(obj2.eventDate);
        return dateValue1-dateValue2
    });

    return `
    <ul>
        ${reservations.map(reservationListItems).join("")
        }
    </ul>
    `
}