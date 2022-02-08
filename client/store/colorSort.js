// playlist name to spotify playlist ID
const playlist = {
    party: '37i9dQZF1DXaXB8fQg7xif',
    folk: '37i9dQZF1DXaUDcU6KDCj4',
    romantic: '37i9dQZF1DWXb9I5xoXLjp',
  }
  
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
     ] : null;
  }

  // input: RGB array and an optional secondary array of RGB arrays
  // output: playlist specified in the above object
  // example: colorSort([1, 255, 25]) returns playlist.folk (37i9dQZF1DXaUDcU6KDCj4)
  const colorSort = (hex) => {
    const accentArr = hexToRgb(hex)
    let [red, green, blue] = accentArr
    let highestVal = Math.max(...accentArr)
    if (highestVal === red) {
      return playlist.party
    } else if (highestVal === green) {
      return playlist.folk
    } else if (highestVal === blue) {
      return playlist.romantic
    }
    else return playlist.party
  }

  
  export default colorSort