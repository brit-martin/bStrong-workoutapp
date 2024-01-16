import { sequelize, Exercise, Program, Schedule, Goal, User} from "../models/model.js"
import { Op } from 'sequelize'
const exercises = [
    {
        name: 'Sumo Squat',
        reps: '8-10',
        sets: 4,
        category: 'Quads'
    },
    {
        name: 'Glute Bridge',
        reps: '10-12',
        sets: 4,
        category: "Glutes-1"
    },
    {
        name: 'Leg Press',
        reps: '8',
        sets: 4,
        category: 'Quads'
    },
    {
        name: 'Reverse Lunge',
        reps: '10 each leg',
        sets: 3,
        category: 'Quads'
    },
    {
        name: 'Box Jumps',
        reps: '12-14',
        sets: 4,
        category: 'Quads'
    },
    {
        name: 'Glute Pullthroughs',
        reps: '12',
        sets: 3,
        category: 'Glutes-2'
    },
    {
        name: 'Sumo Squat',
        reps: '8-10',
        sets: 4,
        category: 'Hamstrings'
    },
    {
        name: 'Barbell Squats',
        reps: '8-10',
        sets: 4,
        category: 'Hamstrings'
    },
    {
        name: 'Single Leg Deadlift',
        reps: '8-10',
        sets: 4,
        category: 'Hamstrings'
    },
    {
        name: 'Hamstring Curl',
        reps: '8-10',
        sets: 4,
        category: 'Hamstrings'
    },
    {
        name: 'Single Leg Hamstring Curl',
        reps: '8-10 Each Leg',
        sets: 4,
        category: 'Hamstrings'
    },
    {
        name: 'Glute Abductions',
        reps: '12-15',
        sets: 3,
        category: 'Glutes-1'
    },
    {
        name: 'Quad Extensions',
        reps: '10-12',
        sets: 3,
        category: 'Quads'
    },
    {
        name: 'Bicep Curls',
        reps: '10-12 each arm',
        sets: 4,
        category: 'Biceps'
    },
    {
        name: 'Hammerhead Curl',
        reps: '10-12 each arm',
        sets: 4,
        category: 'Biceps'
    },
    {
        name: 'Inverted Bicep Curl',
        reps: '20',
        sets: 3,
        category: 'Biceps'
    },
    {
        name: 'Back Fly',
        reps: '8-10',
        sets: 4,
        category: 'Back'
    },
    {
        name: 'Seated Cable Row',
        reps: '10',
        sets: 4,
        category: 'Back'
    },
    {
        name: 'Lat Pull Downs',
        reps: '10-12',
        sets: 4,
        category: 'Back'
    },
    {
        name: 'Assisted Pull ups',
        reps: '10',
        sets: 4,
        category: 'Back'
    },
    {
        name: 'Single Arm Lat Pull Down',
        reps: '10',
        sets: 3,
        category: 'Back'
    },
    {
        name: 'Romanian Deadlift',
        reps: '8-10',
        sets: 4,
        category: 'Back'
    },
    {
        name: 'Plank',
        reps: '1 minute',
        sets: 3,
        category: 'Abs-1'
    },
    {
        name: 'Russian Twists',
        reps: '30',
        sets: 3,
        category: 'Abs-2'
    },
    {
        name: 'Mountain Climbers',
        reps: '40',
        sets: 3,
        category: 'Abs-1'
    },
    {
        name: 'Tricep Pullover',
        reps: '10-12',
        sets: 4,
        category: 'Tricep'
    },
    {
        name: 'Skull Crusher',
        reps: '10-12',
        sets: 3,
        category: 'Tricep'
    },
    {
        name: 'Seated Shoulder Press',
        reps: '10-12',
        sets: 3,
        category: 'Shoulders'
    },
    {
        name: 'Lying Bench Press',
        reps: '10-12',
        sets: 4,
        category: 'Chest'
    },
    {
        name: 'Incline Lateral Raise',
        reps: '8-10',
        sets: 3,
        category: 'Shoulder'
    },
    {
        name: 'Front Raises',
        reps: '8-10',
        sets: 3,
        category: 'Shoulder'
    },
    {
        name: 'Upright Row',
        reps: '8-10',
        sets: 3,
        category: 'Shoulder'
    },
    {
        name: 'T-bar Row',
        reps: '8-10',
        sets: 3,
        category: 'Back'
    },
    {
        name: 'Pushups',
        reps: '10-12',
        sets: 4,
        category: 'Chest'
    },
    {
        name: 'Incline Fly',
        reps: '10',
        sets: 3,
        category: 'Chest'
    }, 
    {
        name: 'Dumbbell Pullover',
        reps: '10-12',
        sets: 3,
        category: 'Chest'
    }, 
    {
        name: 'Standing Cross-body Dumbbell raise',
        reps: '10 each arm',
        sets: 3,
        category: 'Chest'
    },
    {
        name: 'Deadbug',
        reps: '12',
        sets: 3,
        category: 'Abs-1'
    },
    {
        name: 'V-up',
        reps: '15',
        sets: 3,
        category: 'Abs-1'
    },
    {
        name: 'Flutter Kicks',
        reps: '35',
        sets: 3,
        category: 'Abs-2'
    },
    {
        name: 'Sit-ups',
        reps: '15',
        sets: 3,
        category: 'Abs-2'
    },
    {
        name: 'Burpee',
        reps: '15',
        sets: 3,
        category: 'Cardio'
    },
    {
        name: 'Squat Jumps',
        reps: '18',
        sets: 3,
        category: 'Cardio'
    },
    {
        name: 'Jumping Jacks',
        reps: '50',
        sets: 3,
        category: 'Cardio'
    },
    {
        name: 'Squat Jumps',
        reps: '18',
        sets: 3,
        category: 'Cardio'
    },
    {
        name: 'Step Ups',
        reps: '25',
        sets: 3,
        category: 'Cardio'
    },
    {
        name: 'Lying Banded Leg Raises',
        reps: '15 each leg',
        sets: 3,
        category: 'Glutes-2'
    },
]

const users = [
    {
        name: 'Brittany Martin',
    }
]

const programs = [
    {
        name: 'Glutes & Quads',
    },
    {
        name: 'Back & Biceps',
    },
    {
        name: 'Abs & Cardio',
    },
    {
        name: 'Glutes & Hamstrings',
    },
    {
        name: 'Chest & Triceps',
    },
    {
        name: 'Shoulders & Abs'
    },
    {
        name: 'Cardio'
    },
    {
        name: 'Chest & Shoulders'
    },
]

const schedules = [
    {   
        date: '1/1/24',
        
    },
    {   
        date: '1/2/24',
        
    },
    {   
        date: '1/3/24',
        
    },
    {   
        date: '1/4/24',
       
    },
    {   
        date: '1/5/24',
        
    },
]

const goals = [

]




await sequelize.sync({ force: true })

await Exercise.bulkCreate(exercises)
await User.bulkCreate(users)

const newPrograms = await Program.bulkCreate(programs)
const newSchedules = await Schedule.bulkCreate(schedules)
for(let i =0; i < newSchedules.length; i ++){
    await newSchedules[i].setProgram(newPrograms[i])    
}


const GlutesAndQuadsProgram = await Program.findOne({
    where: { name: 'Glutes & Quads'}
})
const GlutesAndQuadsExercises = await Exercise.findAll ({
    where: { category: { [Op.or]: ['Quads','Glutes-2']}}

})
for (let i = 0; i < GlutesAndQuadsExercises.length && i < 5; i++){
    await GlutesAndQuadsExercises[i].addProgram(GlutesAndQuadsProgram)
}


const BackAndBicepsProgram = await Program.findOne({
    where: {name: 'Back & Biceps'}
})
const BackAndBicepsExercises = await Exercise.findAll ({
    where: { category: { [Op.or]: ['Back', 'Biceps']}}
})
for (let i =0; i < BackAndBicepsExercises.length && i < 5; i++){
    await BackAndBicepsExercises[i].addProgram(BackAndBicepsProgram)
}


const AbsAndCardioProgram = await Program.findOne({
    where: { name: 'Abs & Cardio'}
})
const AbsAndCardioExercises = await Exercise.findAll({
    where: { category : {[Op.or]: ['Abs-1', 'Cardio']}}
})
for (let i=0; i < AbsAndCardioExercises.length && i < 5; i++){
    await AbsAndCardioExercises[i].addProgram(AbsAndCardioProgram)
}


const GlutesAndHamstringsProgram = await Program.findOne({
    where: { name: 'Glutes & Hamstrings'}
})
const GlutesAndHamstringsExercises = await Exercise.findAll({
    where: {category: {[Op.or]: ['Glutes-1', 'Hamstrings']}}
})
for (let i=0; i < GlutesAndHamstringsExercises.length && i < 5; i++){
    await GlutesAndHamstringsExercises[i].addProgram(GlutesAndHamstringsProgram)
}


const ChestAndTricepProgram = await Program.findOne({
    where: { name: 'Chest & Triceps'}
})
const ChestAndTricepExercises = await Exercise.findAll({
    where: {category: {[Op.or]: ['Chest', 'Tricep']}}
})
for (let i=0; i < ChestAndTricepExercises.length && i < 5; i++){
    await ChestAndTricepExercises[i].addProgram(ChestAndTricepProgram)
}


const ShouldersAndAbsProgram = await Program.findOne({
    where: { name: 'Shoulder & Abs'}
})
const ShouldersAndAbsExercises = await Exercise.findAll({
    where: {category: {[Op.or]: ['Shoulder', 'Abs-2']}}
})
for (let i=0; i < ShouldersAndAbsExercises.length && i < 5; i++){
    await ShouldersAndAbsExercises[i].addProgram(ShouldersAndAbsProgram)
}


const CardioProgram = await Program.findOne({
    where: { name: 'Cardio'}
})
const CardioExercises = await Exercise.findAll({
    where: {category: 'Cardio' }
})
for (let i=0; i < CardioExercises.length && i < 5; i++){
    await CardioExercises[i].addProgram(CardioProgram)
}


const ChestAndShouldersProgram = await Program.findOne({
    where: { name: 'Chest & Shoulders'}
})
const ChestAndShouldersExercises = await Exercise.findAll({
    where: {category: {[Op.or]: ['Chest', 'Shoulder']} }
})
for (let i=0; i < ChestAndShouldersExercises.length && i < 5; i++){
    await ChestAndShouldersExercises[i].addProgram(ChestAndShouldersProgram)
}

await Goal.bulkCreate(goals)

await sequelize.close()