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
    res.status(200).send(programRegimen)

})

app.post('/new-rep', async (req, res) => {
    let newGoal = req.body.goal
    let scheduleId = req.body.scheduleId
    let exerciseId = req.body.exerciseId
    let userId = req.body.userId

    let newGoalDbObject = await Goal.create({ goal: newGoal, user_id: userId, exercise_id: exerciseId, schedule_id: scheduleId})

    res.status(200).send(newGoalDbObject)
})

// app.put('/favoriteRegimen', async (req, res) => {
//     let favExercise = req.query.favExercise
    


// })

// app.delete('/deleteRep/:rep', (req, res) => {
//     let rep = req.params.rep

// })


ViteExpress.listen(app, 8080, () => {
    console.log('Server is up on 8080')
})