import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    // userName: ,
    todos:[],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.GETTINGTODO:
            return ({
                ...state,
                todos:action.payload
            })


            case ActionTypes.DELETINGTODO:
            return ({
                ...state,
                todos:action.payload
            })

            
            case ActionTypes.DELETEALL:
            return ({
                todos:action.payload
            })
        default:
            return state;
    }

}