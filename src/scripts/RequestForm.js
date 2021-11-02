import { sendReservation } from "./dataAccess.js"

document.addEventListener("click", clickSubmit => {
    if (clickSubmit.target.id === "submitReservation") {
        
        const parentInput = document.querySelector("input[name='parentName']").value
        const childInput = document.querySelector("input[name='childName']").value
        const attendeeInput = document.querySelector("input[name='numOfAttendees']").value
        const addressInput = document.querySelector("input[name='address']").value
        const dateInput = document.querySelector("input[name='eventDate']").value
        const lengthInput = document.querySelector("input[name='eventLength']").value

        const reservationObj = {
            parentName: parentInput,
            childName: childInput,
            numOfAttendees: attendeeInput,
            address: addressInput,
            eventDate: dateInput,
            eventLength: lengthInput
        }

        sendReservation(reservationObj)
    }
}
)

export const requestForm = () => {
    return `
    <div class="field">
        <label class="label" for="parentName">Parent's First and Last Name</label>
        <input type="text" name="parentName" class="input" />
    </div>
    <div class="field">
        <label class="label" for="childName">Child's First and Last Name</label>
        <input type="text" name="childName" class="input" />
    </div>
    <div class="field">
        <label class="label" for="eventAttendees">Number of Attendees</label>
        <input type="number" name="numOfAttendees" class="input" />
    </div>
    <div class="field">
        <label class="label" for="eventAddress">Event Address</label>
        <input type="text" name="address" class="input" />
    </div>
    <div class="field">
        <label class="label" for="eventDate">Event Date</label>
        <input type="date" name="eventDate" class="input" />
    </div>
    <div class="field">
        <label class="label" for="eventLength">Event Length (in Hours)</label>
        <input type="number" name="eventLength" class="input" />
    </div>

    <button class="button" id="submitReservation">Submit Reservation</button>
    `
}