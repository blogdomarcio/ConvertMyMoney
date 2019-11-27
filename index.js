const express = require('express')

const app = express()

const axios = require('axios')

const path = require('path')

const convert = require('./lib/convert')

app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')

app.use(express.static(path.resolve(__dirname, 'public')))

const port = process.env.PORT || 3000

app.get('/', (req, res) => {

    // try {

    //     const response = await axios.get('https://api.hgbrasil.com/finance')

    //     // console.log(response.data)

    //     dolar = JSON.stringify(response.data.results.currencies.USD.buy)

    //     res.render('index', { dolar })

    // } catch {

    dolar = null
    res.render('index', { dolar })

    // }

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