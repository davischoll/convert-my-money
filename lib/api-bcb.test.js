const api = require('./api-bcb')

const axios = require('axios')

jest.mock('axios')

test('getCotacaoAPI', () => {
  const res = {
    data: {
      value: [
        { cotacaoVenda: 5.30 }
      ]
    }
  }
  axios.get.mockResolvedValue(res)
  api.getCotacaoAPI('url').then( resp => {
    expect(resp).toEqual(res)
    expect(axios.get.mock.calls[0][0]).toBe('url')
  })
})

test('extractCotacao', () => {
  const cotacao = api.extractCotacao({
    data: {
      value: [
        { cotacaoVenda: 5.30 }
      ]
    }
  })
  expect(cotacao).toBe(5.30)
})

describe('getToday', () => {
  const RealDate = Date

  function mockDate(date){
    global.Date = class extends RealDate {
      constructor(){
        return new RealDate(date)
      }
    }
  }
  afterEach(() => {
    global.Date = RealDate
  })

  test('getToday', () => {
    mockDate('2021-03-04T12:00:00z')
    const today = api.getToday()
    expect(today).toBe('3-4-2021')
  })
})

test('getUrl', () => {
  const url = api.getUrl('MINHA-DATA')
  expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATA%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

test('getCotacao', () => {
  const res = {
    data: {
      value: [
        { cotacaoVenda: 5.30 }
      ]
    }
  }

  const getToday = jest.fn()
  getToday.mockReturnValue('03-04-2020')

  const getUrl = jest.fn()
  getUrl.mockReturnValue('url')

  const getCotacaoAPI = jest.fn()
  getCotacaoAPI.mockResolvedValue(res)

  const extractCotacao = jest.fn()
  extractCotacao.mockReturnValue(5.30)

  api.pure
    .getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao })()
    .then( res => {
      expect(res).toBe(5.30)
    })
})

test('getCotacao', () => {
  const res = {
  }

  const getToday = jest.fn()
  getToday.mockReturnValue('03-04-2021')

  const getUrl = jest.fn()
  getUrl.mockReturnValue('url')

  const getCotacaoAPI = jest.fn()
  getCotacaoAPI.mockReturnValue(Promise.reject('err'))

  api.pure
    .getCotacao({ getToday, getUrl, getCotacaoAPI })()
    .then( res => {
      expect(res).toBe('')
    })
})