import { requestForm } from "./RequestForm.js"
import { reservationHTML } from "./Reservations.js"


export const HireAClown = () => {
    return `
        <h1>Buttons and Lollipop: Clowns for Hire</h1>

        <section class="requestForm">
        ${requestForm()}
        </section>

        <section class="reservations">
            <h2>Reservations</h2>
            <section class="tabletitles">
                <h4 id="tabletitle-1">Description</h4>
                <h4 id="tabletitle-2">Completed By</h4>
            </section>
            ${reservationHTML()}
        </section>
    `
}