import axios from 'axios'

const ADD_PHOTO = 'ADD_PHOTO';
const ADD_FILE = 'ADD_FILE';


export const captureNewPhoto = (photo) => {
    return {
        type: ADD_PHOTO,
        photo
    }
}

export const addfile = (file) => {
    return {
        type: ADD_FILE,
        file
    }
}



let initialState = {
    photo: {},
    file: {}
}


export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_PHOTO:
            return { ...state, photo: action.photo };
        case ADD_FILE:
            return { ...state, file: action.file };
        default:
            return state
    }
}

// let initialState = {}


// export const photo = (state = initialState, action)  => {
//     switch (action.type) {
//         case ADD_PHOTO:
//             return action.photo
//         default:
//             return state
//     }
// }

// export const file = (state = initialState, action)  => {
//     switch (action.type) {
//         case ADD_FILE:
//             return action.file
//         default:
//             return state
//     }
// }