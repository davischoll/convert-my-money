const axios = require('axios')

function getUrl (data) {
  return `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
}

function getCotacaoAPI (data) {
  return axios.get(getUrl(data))
}

function extractCotacao (res) {
  return res.data.value[0].cotacaoVenda
}

function getToday() {
  const today = new Date()
  return today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear()
}

const getCotacao = async() => {
  try{
    const today = getToday()
    const res = await getCotacaoAPI(today)
    const cotacao = extractCotacao(res)
    return cotacao  
  }catch(err){
    return ''
  }
}

module.exports = {
  getCotacaoAPI,
  getCotacao,
  extractCotacao
}


// const axios = require ('axios')

// const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
// const getCotacaoAPI = url => axios.get(url)
// const extractCotacao = res => res.data.value[0].cotacaoVenda
// const getToday = () => {
//   const today = new Date()
//   return (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()  // '8-14-2020'
// }
// const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async() => {
//   try{    
//     const today = getToday()
//     const url = getUrl(today)
//     const res = await getCotacaoAPI(url)
//     const cotacao = extractCotacao(res)
//     return cotacao
//   }catch(err){
//     return ''
//   }
// }

// module.exports = {
//   getCotacaoAPI,
//   getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao }),
//   extractCotacao,
//   getUrl,
//   getToday,
//   pure: {
//     getCotacao
//   }
// }
