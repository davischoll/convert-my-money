const axios = require('axios')

function getUrl (data) {
  return `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
}

function getCotacaoAPI (url) {
  return axios.get(url)
}

function extractCotacao (res) {
  return res.data.value[0].cotacaoVenda
}

function getToday() {
  const today = new Date()
  return (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
}

const getCotacao = dependencies => async() => {
  try{
    const getToday = dependencies.getToday
    const getUrl = dependencies.getUrl
    const getCotacaoAPI = dependencies.getCotacaoAPI
    const getCotacao = dependencies.getCotacao

    const today = getToday()
    const url = getUrl(today)
    const res = await getCotacaoAPI(url)
    const cotacao = extractCotacao(res)
    return cotacao  
  }catch(err){
    return ''
  }
}

module.exports = {
  getCotacaoAPI,
  getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao }),
  extractCotacao,
  getToday,
  getUrl,
  pure: {
    getCotacao
  }
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
