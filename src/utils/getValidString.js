export default function getValidString(str){
    if(!str.length){
        return str
    }
    const validSymbols = 'qwertyuiopasdfghjklzxcvbnmйцукенгшщзхъфывапролджэячсмитьбю'
    let valid_str = str.toLowerCase()
    let result_str = valid_str.split('').filter(item=>validSymbols.includes(item))
    return result_str.join('')
}