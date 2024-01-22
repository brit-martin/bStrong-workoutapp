import express from 'express'
import ViteExpress from 'vite-express'
import { Exercise, Program, Schedule, Goal, User } from './models/model.js'
import {Op} from 'sequelize'

const app = express()

app.use(express.json())

app.get('/workout', async (req, res) => {
    let programId = +req.query.programId
    let date = req.query.date

    let program = await Program.findOne({
        where: { id: programId },
    })

    let scheduleDate = await Schedule.findOne({
        where: { date: date },
    })

    // console.log(scheduleDate)
    // console.log(program)

    let programRegimen = await program.getExercises({
        attributes: ["name", "reps", "sets"]
        
    })
    let programDateArray = [];
    for (let i=0; i < programRegimen.length; i++){
        let programDateObj = {}
        let programObj = programRegimen[i]
    //     console.log(programObj)
    
    // console.log(programRegimen)
        
        programDateObj.scheduleId = scheduleDate.id
        programDateObj.name = programObj.name
        programDateObj.reps = programObj.reps
        programDateObj.sets = programObj.sets
        programDateObj.programId = programObj.ExercisePrograms.programId
        programDateObj.exerciseId = programObj.ExercisePrograms.exerciseId

        programDateArray.push(programDateObj)
        
        // console.log(programDateArray)

    }
    res.status(200).send(programDateArray)

})


app.get('/this-weeks-program', async (req, res) => {
    
    let datesOfThisWeek = [
        '2024-01-01',
        '2024-01-02',
        '2024-01-03',
        '2024-01-04',
        '2024-01-05',
    ]

    let thisWeeksSchedules = await Schedule.findAll({
        where: { date: { [Op.in]: datesOfThisWeek}},
        order: [['date', 'ASC']]
    })
    // console.log(thisWeeksSchedules)
    let dateNameObjs = []
    for(let i =0; i < thisWeeksSchedules.length; i++){
        let oneDateNameObj = {}
        let scheduleObj = thisWeeksSchedules[i]
        // console.log(scheduleObj)
       
        let theProgram = await scheduleObj.getProgram()      
        console.log(theProgram) 
      
        oneDateNameObj.date = thisWeeksSchedules[i].date
        oneDateNameObj.name = theProgram.name
        oneDateNameObj.programId = theProgram.id
        oneDateNameObj.isFav = theProgram.isFav
        dateNameObjs.push(oneDateNameObj)
    }  
  res.status(200).send(dateNameObjs) 

})


app.post('/new-rep', async (req, res) => {
    let newGoal = req.body.goal
    let scheduleId = req.body.scheduleId
    let exerciseId = req.body.exerciseId
    let userId = req.body.userId

    let newGoalDbObject = await Goal.create({ goal: newGoal, userId: userId, exerciseId: exerciseId, scheduleId: scheduleId})

    res.status(200).send(newGoalDbObject)
})



app.put('/favorite-regimen', async (req, res) => {
    let favExerciseId = req.query.id
    
    console.log(favExerciseId)

    let favoriteProgramObj = await Program.findOne({
        where: { id: favExerciseId }
    })
    let updatedFavTable = await favoriteProgramObj.update({isFav: !favoriteProgramObj.isFav})



    res.status(200).send(updatedFavTable)
})



app.delete('/reset-rep', async (req, res) => {
    let scheduleId = req.query.scheduleId
    console.log(scheduleId)
    let deleteScheduleId = await Goal.destroy ({
        where: { schedule_id: scheduleId}
    })
    res.status(200).send(deleteScheduleId)
    console.log(deleteScheduleId)

})



ViteExpress.listen(app, 8080, () => {
    console.log('Server is up on 8080')
})