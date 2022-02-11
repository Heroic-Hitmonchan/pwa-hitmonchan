
const ADD_PHOTO = 'ADD_PHOTO';
const ADD_FILE = 'ADD_FILE';


export const captureNewPhoto = (photo) => {
    return {
        type: ADD_PHOTO,
        photo
    }
}

export const addfile = (file) => {
    window.localStorage.setItem("file", JSON.stringify(file));
    return {
        type: ADD_FILE,
        file
    }
}

let initialState1 = JSON.parse(window.localStorage.getItem("image")) || {}


export const photo = (state = initialState1, action)  => {
    switch (action.type) {
        case ADD_PHOTO:
            return action.photo
        default:
            return state
    }
}

let initialState2 =  ''
export const file = (state = initialState2, action)  => {
    switch (action.type) {
        case ADD_FILE:
            return action.file
        default:
            return state
    }
}