jest.mock("react-request-hook", () => ({
    useResource: () => [null, jest.fn()]
}));

import { render, screen } from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import ViewAppointmentsPage from "../ViewAppointmentsPage";
import ViewPrescriptionPage from "../ViewPrescriptionsPage";
import ViewTestsPage from "../ViewTestsPage";
import {StateContext} from "../../../contexts/contexts";

const baseState = {
    user: {
        id: 1,
        role: "patient",
        name: "Test Patient",
        email: "test@example.com",
        postCode: "SO14 0AA",
        doctorId: 2
    },
    appointments: [
        {
            date: "01/01/2024",
            time: "9:00am",
            staffName: "Dr Demo"
        }
    ],
    prescriptions: [
        {
            condition: "Seasonal allergies",
            medication: "Medication A",
            pharmacy: "Central Pharmacy"
        }
    ],
    tests: [
        {
            date: "02/01/2024",
            time: "10:00am",
            type: "MRI Scan",
            condition: "Migraine",
            location: "Main Lab",
            results: "Pending"
        }
    ]
}

function renderWithState(ui, overrides = {}) {
    const state = {
        ...baseState,
        ...overrides
    }

    return render(
        <MemoryRouter>
            <StateContext.Provider value={{ state, dispatch: jest.fn() }}>
                { ui }
            </StateContext.Provider>
        </MemoryRouter>
    )
}

describe("Patient dashboard views", () => {
    test("displays upcoming appointments", () => {
        renderWithState(<ViewAppointmentsPage />)
        expect(screen.getByText("Dr Demo")).toBeInTheDocument()
        expect(screen.getByText("9:00am")).toBeInTheDocument()
    })

    test("lists prescribed medication", () => {
        renderWithState(<ViewPrescriptionPage />)
        expect(screen.getByText("Medication A")).toBeInTheDocument()
        expect(screen.getByText("Central Pharmacy")).toBeInTheDocument()
    })

    test("shows recorded lab tests", () => {
        renderWithState(<ViewTestsPage />)
        expect(screen.getByText("MRI Scan")).toBeInTheDocument()
        expect(screen.getByText("Main Lab")).toBeInTheDocument()
    })
})
