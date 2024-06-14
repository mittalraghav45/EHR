export function testListReducer(state, action) {
    switch (action.type){  
        case "FETCH_TEST":
            return action.tests
        default:
            return state
    }
}