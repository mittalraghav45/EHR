import {Table, TableBody, TableCell, TableContainer } from "@mui/material";
import {AlternatingTableRow} from "./AlternatingTableRow";

export function Registration ({registration}) {

    console.log(registration)

    const name = registration.title + " " + registration.firstName + " " + registration.surname
    const addr = registration.address
    const line2 = addr.line2 !== "" ? addr.line2 + ", " : ""
    const address = addr.street + ", " + line2 + addr.townCity + ", " + addr.postCode
    const dateOfBirth = registration.dateOfBirth.format("D MMM YYYY")
    const consent = registration.consent
    const emailConsent = consent.email ? "may" : "must not"
    const smsConsent = consent.sms ? "may" : "must not"
    const nextOfKinConsent = consent.nextOfKin ? "may" : "must not"

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <AlternatingTableRow>
                        <TableCell>Name:</TableCell>
                        <TableCell>{name}</TableCell>
                    </AlternatingTableRow>
                    <AlternatingTableRow>
                        <TableCell>Email:</TableCell>
                        <TableCell>{registration.email}</TableCell>
                    </AlternatingTableRow>
                    <AlternatingTableRow>
                        <TableCell>Date Of Birth:</TableCell>
                        <TableCell>{dateOfBirth}</TableCell>
                    </AlternatingTableRow>
                    <AlternatingTableRow>
                        <TableCell>Gender:</TableCell>
                        <TableCell>{registration.gender}</TableCell>
                    </AlternatingTableRow>
                    <AlternatingTableRow>
                        <TableCell>Address:</TableCell>
                        <TableCell>{address}</TableCell>
                    </AlternatingTableRow>
                    <AlternatingTableRow>
                        <TableCell>Mobile No.:</TableCell>
                        <TableCell>{registration.phoneNumbers.mobile}</TableCell>
                    </AlternatingTableRow>
                    <AlternatingTableRow>
                        <TableCell>Home Telephone No.:</TableCell>
                        <TableCell>{registration.phoneNumbers.home}</TableCell>
                    </AlternatingTableRow>
                    <AlternatingTableRow>
                        <TableCell>Consent:</TableCell>
                        <TableCell>
                            The surgery <b>{emailConsent}</b> use email to contact me in the future.<br/>
                            The surgery <b>{smsConsent}</b> use SMS to contact me in the future.<br/>
                            The surgery <b>{nextOfKinConsent}</b> contact my next of kin if necessary.
                        </TableCell>
                    </AlternatingTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}