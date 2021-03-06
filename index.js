const express = require('express')

const app = express()

const axios = require('axios')

const request = require('request');

const path = require('path')

const convert = require('./lib/convert')

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')

app.use(express.static(path.resolve(__dirname, 'public')))

const port = process.env.PORT || 3000

app.get('/', async(req, res) => {

    try {

        const response = await axios.get('https://api.hgbrasil.com/finance')

        // console.log(response.data)

        dolar = response.data.results.currencies.USD.buy.toString()

        res.render('index', { dolar: convert.toMoney(dolar) })

        return response

    } catch (err) {

        console.log(err)

        res.render('index', { dolar: null })

    }

})

app.get('/cotacao', (req, res) => {

    const { cotacao, quantidade } = req.query

    if (cotacao && quantidade) {

        const conversao = convert.convert(cotacao, quantidade)

        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    } else {
        res.render('cotacao', { error: 'Valores Inválidos' })

    }
})


app.listen(port, (err) => {
    if (err) {
        console.log('Erro ao iniciar servidor')
    } else {
        console.log('Servidor ConvertMoney rodando com sucesso')
    }
})