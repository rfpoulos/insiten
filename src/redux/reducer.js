import reducerHandlers, { initialState } from './actions';

let fallback = (state, action) => state;

let reducer = (oldState = initialState, action) => {
    let babyReducer = reducerHandlers[action.type] || fallback;
    return babyReducer(oldState, action);
};

export default reducer;

