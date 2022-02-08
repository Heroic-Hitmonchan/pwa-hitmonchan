import axios from 'axios'

export default async (palette, spotifyUserId, url, setImage) => {
    const { data: image } = await axios.post(`/api/images/${spotifyUserId}`, {
        colorData: palette,
        url: url
    })
    return image
}