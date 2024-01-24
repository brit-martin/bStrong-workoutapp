import express from 'express'
import ViteExpress from 'vite-express'
import { Exercise, Program, Schedule, Goal, User } from './models/model.js'
import {Op} from 'sequelize'

const app = express()

app.use(express.json())
// this loads when you click on the exercises button and sends scheduleId, goal, name
// reps, sets, programId, and exerciseId to the front end.
app.get('/workout', async (req, res) => {
    let programId = +req.query.programId
    let date = req.query.date

    let program = await Program.findOne({
        where: { id: programId }
    })

    let scheduleDate = await Schedule.findOne({
        where: { date: date },
        include: {
            model: Goal,
        }
    })

    console.log(scheduleDate)
    // console.log(program)

    let programRegimen = await program.getExercises({
        attributes: ["name", "reps", "sets"],
    })

    // console.log(programRegimen)
    let programDateArray = [];
    for (let i=0; i < programRegimen.length; i++){
        let programDateObj = {}
        let programObj = programRegimen[i]
        // console.log(programObj)
    
    // console.log(programRegimen)

        let goalNum = "";

        // console.log(programObj.ExercisePrograms.exerciseId)
        scheduleDate.goals.forEach((goalObj) => {
            if(+goalObj.exerciseId === programObj.ExercisePrograms.exerciseId){
                goalNum = goalObj.goal;
                return 
            }
        });
        console.log(goalNum)
        
        programDateObj.scheduleId = scheduleDate.id
        programDateObj.goal = goalNum;
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

//this loads all the programs when you are on the home page
//this sends the date, name of exercise, programId, program image, isFav
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
        // console.log(theProgram) 
      
        oneDateNameObj.date = thisWeeksSchedules[i].date
        oneDateNameObj.name = theProgram.name
        oneDateNameObj.programId = theProgram.id
        oneDateNameObj.image = theProgram.image
        oneDateNameObj.isFav = theProgram.isFav

        dateNameObjs.push(oneDateNameObj)
    }  
  res.status(200).send(dateNameObjs) 

})

//this changes the goal column to the input the user put in
//this sends back the goal table with the updated goal, userId, exerciseId, and the scheduleId
app.post('/new-rep', async (req, res) => {
    let newGoal = req.body.goal
    let scheduleId = req.body.scheduleId
    let exerciseId = req.body.exerciseId
    let userId = req.body.userId

    let newGoalDbObject = await Goal.findOrCreate({ 
        where: {exerciseId},
        defaults: {
            goal: newGoal, userId: userId, exerciseId: exerciseId, scheduleId: scheduleId
        }
    });
    // console.log(newGoalDbObject)
    if(!newGoalDbObject[1]){
        await Goal.update({goal: newGoal},{
            where: {exerciseId}
        })
    }

    res.status(200).send(newGoalDbObject)
})


//this changes the isFav column from false to true when user clicks on the button
//this sends the updated table to the front end with the id, name, isFave, and image
app.put('/favorite-regimen', async (req, res) => {
    let favExerciseId = req.query.id
    
    // console.log(favExerciseId)

    let favoriteProgramObj = await Program.findOne({
        where: { id: favExerciseId }
    })
    let updatedFavTable = await favoriteProgramObj.update({isFav: !favoriteProgramObj.isFav})



    res.status(200).send(updatedFavTable)
})


//this erases with the user clicks the reset button by destroy the goal column where the 
//scheduleId matches with the scheduleId they clicked on
//send back date, name, programId, and image
app.delete('/reset-rep', async (req, res) => {
    let scheduleId = req.query.scheduleId

    await Goal.destroy({
        where: {scheduleId: scheduleId}
    });

    res.status(200).send({
        message: "goals were reset"
    })

})

app.get('/get-favorited', async (req, res) => {
    let favoriteBoolean = req.query.isFav

    let favortieObj = await Program.findAll({
        where: {isFav: favoriteBoolean}
    })
    res.status(200).send(favortieObj)
})

ViteExpress.listen(app, 8080, () => {
    console.log('Server is up on 8080')
})