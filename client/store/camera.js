import axios from 'axios'

const CAPTURE_PHOTO = 'CAPTURE_PHOTO';

export const captureNewPhoto = (image) => {
    return {
        type: CAPTURE_PHOTO,
        image
    }
}

export default function (state = {}, action) {
    switch (action.type) {
        case CAPTURE_PHOTO:
            return action.image
        default:
            return state
    }
}