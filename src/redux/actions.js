export const initialState = ({
    user: null,
});

const UPDATE_USER = "UPDATE_USER";
export let updateUser = (payload) => ({type: UPDATE_USER, payload});
let updateUserAction = (state, action) => {
    return ({ ...state, user: action.payload });
}
updateUser.toString = () => UPDATE_USER;


export default ({
    [updateUser]: updateUserAction,
});