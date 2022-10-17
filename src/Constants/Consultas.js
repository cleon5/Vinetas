import Axios from "axios";


export const getComic = async(num) => {
    let result;
    let url = `https://xkcd.com/${num}/info.0.json`
    try {
        console.log(url)
        await Axios.get(url)
        .then(data => {
            result = data.data
        })
    } catch (error) {
        console.log(error)
    } 
    return result
}

export const getRandom = async() => {
    let result;
    let max = 2685
    let random = Math.floor(Math.random() * (max))
    let url = `https://xkcd.com/${random}/info.0.json`
    try {
        console.log(url)
        await Axios.get(url)
        .then(data => {
            result = data.data
        })
    } catch (error) {
        console.log(error)
    } 
    return result
}