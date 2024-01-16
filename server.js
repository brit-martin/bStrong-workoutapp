import express from 'express'
import ViteExpress from 'vite-express'
import { Exercise, Program, Schedule, Goal, User } from './models/model.js'

const app = express()

app.use(express.json())

app.get('/workout', async (req, res) => {
    let programId = +req.query.programId
    let program = await Program.findOne({
        where: { id: programId },
    })

    console.log(program)
    let programRegimen = await program.getExercises({
        attributes: ["name", "reps", "sets"]
    })
    // console.log(programRegimen)
    res.status(200).send(programRegimen)

})



// app.post('/new-rep', (req, res) => {
//     let newRepAchieved = req.body
//     Goal.push(newRepAchieved)

//     res.status(200).send(Goal)
// })

// app.delete('/deleteRep/:rep', (req, res) => {
//     let rep = req.params.rep

// })


ViteExpress.listen(app, 8080, () => {
    console.log('Server is up on 8080')
})