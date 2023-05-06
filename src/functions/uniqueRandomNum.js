export function uniqueRandomNum(count = 7, limit) {
    let uniqueRandomNumArray = []
    console.log(limit,' from uniqueRandomNum');
    if (limit) {
        function randomNumGenerator() {
            let random = Math.floor((Math.random()) * limit)
            if (uniqueRandomNumArray.includes(random) && uniqueRandomNumArray.length < limit) {
                return randomNumGenerator()
            } else {
                return random
            }
        }
        for (let i = 0; i < count; i++) {
            let randomInt = randomNumGenerator()
            uniqueRandomNumArray.push(randomInt)
        }
    }
    console.log(uniqueRandomNumArray);
    return uniqueRandomNumArray
}