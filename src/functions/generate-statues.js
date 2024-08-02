import { requestStatuses } from "../constants/statuses";

export const generateStatus = {
    init: () => {
        return {...requestStatuses}
    },

    request: () => {
        return {...requestStatuses, inProgress: true}
    },

    done: () => {
        return {...requestStatuses, done: true, success: true}
    },
}