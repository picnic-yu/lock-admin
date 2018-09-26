let arr = [];
getRandomPoint()
function getRandomPoint() {
    for (let i = 0; i < 10000; i++) {
        arr.push({
            lnglat: [
                (Math.random() * 12 + 108) + '',
                (Math.random() * 20 + 20) + '']
        })
    }
}
export default arr