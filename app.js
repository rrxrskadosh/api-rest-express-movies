const express = require('express')

const app = express()

app.disabled('x-powered-by')

app.get('/'), (req, res) => {
    res.json({ message: "Hello server!" })
}

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`server listen on port http://localhost:${PORT}`)
})