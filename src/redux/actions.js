export const initialState = ({
    user: null,
});

const UPDATE_USER = "UPDATE_USER";
export let updateUser = (payload) => ({type: UPDATE_USER, payload});
let updateUserAction = (state, action) => {
    return ({ ...state, user: action.payload });
}
updateUser.toString = () => UPDATE_USER;

const RESET_STATE = "RESET_STATE";
export let resetState = () => ({type: RESET_STATE});
let resetStateAction = (state, action) => {
    return (initialState);
}
resetState.toString = () => RESET_STATE;

export default ({
    [updateUser]: updateUserAction,
    [resetState]: resetStateAction,
});