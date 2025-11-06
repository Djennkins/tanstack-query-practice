import { act, renderHook, waitFor } from "@testing-library/react";

import { useAppointments } from "../hooks/useAppointments";
import { AppointmentDateMap } from "../types";

import { createQueryClientWrapper } from "@/test-utils";

// a helper function to get the total number of appoinments from an AppointmentDateMap
function getAppointmentCount(appointments: AppointmentDateMap) {
    return Object.values(appointments).reduce(
        (runningCount, appoinmentOnDate) =>
            runningCount + appoinmentOnDate.length,
        0
    );
}

test("filter appointments by availability", async () => {
    const { result } = renderHook(() => useAppointments(), {
        wrapper: createQueryClientWrapper(),
    });

    // wait for appoinments to populate
    await waitFor(() =>
        expect(
            getAppointmentCount(result.current.appointments)
        ).toBeGreaterThan(0)
    );

    // appoinments start out filtered (show only available appointments)
    const filteredAppoinmentsLength = getAppointmentCount(
        result.current.appointments
    );

    // set to return all appointments
    act(() => result.current.setShowAll(true));

    //wait for count of appoinments to be greater than when filtered
    await waitFor(() =>
        expect(
            getAppointmentCount(result.current.appointments)
        ).toBeGreaterThan(filteredAppoinmentsLength)
    );
});
