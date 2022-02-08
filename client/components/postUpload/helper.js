import axios from 'axios'

//store values as a hex
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
        ] : null;
}

export default async (palette, spotifyUserId, url) => {
    const hexData = hexToRgb(palette[0]).join(',')
    const { data: image } = await axios.post(`/api/images/${spotifyUserId}`, {
        colorData: hexData,
        url: url
    })
    return image
}