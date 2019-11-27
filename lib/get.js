const axios = require('axios')

const url = 'https://api.hgbrasil.com/finance'



function createRequest1() {
    const request = axios.get(url)
  
    request
   
    .then(result => { const dolar = result.data.results.currencies.USD.buy; console.log(dolar) })

    .catch(error => console.error('(1) Inside error:', error))

    

    return request
  }

  dados = createRequest1()

  console.log('Dados', dados)

 
