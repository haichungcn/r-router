import {createStore} from 'redux';

const initialState = {
    email: '',
    password: ''
};

const reducer = (state=initialState, action) => {
	switch (action.type) {
		case "SIGN_IN":
            console.log('SIGN-IN')
            return {...state, ...action.payload};
        case "SIGN_OUT":
            return initialState;
		default:
			return state
    }
}

let store = createStore(reducer)

export default store;
