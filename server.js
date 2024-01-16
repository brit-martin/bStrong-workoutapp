import express from 'express'
import ViteExpress from 'vite-express'
import { Exercise, Program, Schedule, Goal, User } from './models/model.js'

const app = express()

app.use(express.json())

// app.get('/workouts', (req, res) => {
//     res.status(200).send()
// })

ViteExpress.listen(app, 8080, () => {
    console.log('Server is up on 8080')
})