import { sequelize, Exercise, Program, Schedule, Goal, User} from "../models/model.js"
import { Op } from 'sequelize'
const exercises = [
    {
        name: 'Sumo Squat',
        reps: '8-10 reps',
        sets: 4,
        category: 'Quads'
    },
    {
        name: 'Glute Bridge',
        reps: '10-12 reps',
        sets: 4,
        category: "Glutes-1"
    },
    {
        name: 'Leg Press',
        reps: '8 reps',
        sets: 4,
        category: 'Quads'
    },
    {
        name: 'Reverse Lunge',
        reps: '10 reps each leg',
        sets: 3,
        category: 'Quads'
    },
    {
        name: 'Box Jumps',
        reps: '12-14 reps',
        sets: 4,
        category: 'Quads'
    },
    {
        name: 'Glute Pullthroughs',
        reps: '12 reps',
        sets: 3,
        category: 'Glutes-2'
    },
    {
        name: 'Sumo Squat',
        reps: '8-10 reps',
        sets: 4,
        category: 'Hamstrings'
    },
    {
        name: 'Barbell Squats',
        reps: '8-10 reps',
        sets: 4,
        category: 'Hamstrings'
    },
    {
        name: 'Single Leg Deadlift',
        reps: '8-10 reps',
        sets: 4,
        category: 'Hamstrings'
    },
    {
        name: 'Hamstring Curl',
        reps: '8-10 reps',
        sets: 4,
        category: 'Hamstrings'
    },
    {
        name: 'Single Leg Hamstring Curl',
        reps: '8-10 reps Each Leg',
        sets: 4,
        category: 'Hamstrings'
    },
    {
        name: 'Glute Abductions',
        reps: '12-15 reps',
        sets: 3,
        category: 'Glutes-1'
    },
    {
        name: 'Quad Extensions',
        reps: '10-12 reps',
        sets: 3,
        category: 'Quads'
    },
    {
        name: 'Bicep Curls',
        reps: '10-12 reps each arm',
        sets: 4,
        category: 'Biceps'
    },
    {
        name: 'Hammerhead Curl',
        reps: '10-12 reps each arm',
        sets: 4,
        category: 'Biceps'
    },
    {
        name: 'Inverted Bicep Curl',
        reps: '20 reps',
        sets: 3,
        category: 'Biceps'
    },
    {
        name: 'Back Fly',
        reps: '8-10 reps',
        sets: 4,
        category: 'Back'
    },
    {
        name: 'Seated Cable Row',
        reps: '10 reps',
        sets: 4,
        category: 'Back'
    },
    {
        name: 'Lat Pull Downs',
        reps: '10-12 reps',
        sets: 4,
        category: 'Back'
    },
    {
        name: 'Assisted Pull ups',
        reps: '10 reps',
        sets: 4,
        category: 'Back'
    },
    {
        name: 'Single Arm Lat Pull Down',
        reps: '10 reps',
        sets: 3,
        category: 'Back'
    },
    {
        name: 'Romanian Deadlift',
        reps: '8-10 reps',
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
        reps: '30 reps',
        sets: 3,
        category: 'Abs-2'
    },
    {
        name: 'Mountain Climbers',
        reps: '40 reps',
        sets: 3,
        category: 'Abs-2'
    },
    {
        name: 'Tricep Pullover',
        reps: '10-12 reps',
        sets: 4,
        category: 'Tricep'
    },
    {
        name: 'Skull Crusher',
        reps: '10-12 reps',
        sets: 3,
        category: 'Tricep'
    },
    {
        name: 'Seated Shoulder Press',
        reps: '10-12 reps',
        sets: 3,
        category: 'Shoulders'
    },
    {
        name: 'Lying Bench Press',
        reps: '10-12 reps',
        sets: 4,
        category: 'Chest'
    },
    {
        name: 'Incline Lateral Raise',
        reps: '8-10 reps',
        sets: 3,
        category: 'Shoulder'
    },
    {
        name: 'Front Raises',
        reps: '8-10 reps',
        sets: 3,
        category: 'Shoulder'
    },
    {
        name: 'Upright Row',
        reps: '8-10 reps',
        sets: 3,
        category: 'Shoulder'
    },
    {
        name: 'T-bar Row',
        reps: '8-10 reps',
        sets: 3,
        category: 'Back'
    },
    {
        name: 'Pushups',
        reps: '10-12 reps',
        sets: 4,
        category: 'Chest'
    },
    {
        name: 'Incline Fly',
        reps: '10 reps',
        sets: 3,
        category: 'Chest'
    }, 
    {
        name: 'Dumbbell Pullover',
        reps: '10-12 reps',
        sets: 3,
        category: 'Chest'
    }, 
    {
        name: 'Standing Cross-body Dumbbell raise',
        reps: '10 reps each arm',
        sets: 3,
        category: 'Chest'
    },
    {
        name: 'Deadbug',
        reps: '12 reps',
        sets: 3,
        category: 'Abs-1'
    },
    {
        name: 'V-up',
        reps: '15 reps',
        sets: 3,
        category: 'Abs-1'
    },
    {
        name: 'Flutter Kicks',
        reps: '35 reps',
        sets: 3,
        category: 'Abs-2'
    },
    {
        name: 'Sit-ups',
        reps: '15 reps',
        sets: 3,
        category: 'Abs-2'
    },
    {
        name: 'Burpee',
        reps: '15 reps',
        sets: 3,
        category: 'Cardio'
    },
    {
        name: 'Squat Jumps',
        reps: '18 reps',
        sets: 3,
        category: 'Cardio'
    },
    {
        name: 'Jumping Jacks',
        reps: '50 reps',
        sets: 3,
        category: 'Cardio'
    },
    {
        name: 'Squat Jumps',
        reps: '18 reps',
        sets: 3,
        category: 'Cardio'
    },
    {
        name: 'Step Ups',
        reps: '25 reps',
        sets: 3,
        category: 'Cardio'
    },
    {
        name: 'Lying Banded Leg Raises',
        reps: '15 reps each leg',
        sets: 3,
        category: 'Glutes-2'
    },
]

const users = [
    {
        email: 'brittanylarson16@gmail.com',
        password: "heyyy",
        fname: 'Brittany',
        lname: "Martin"

    }
]

const programs = [
    {
        name: 'Glutes & Quads',
        image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGhlJTIwZ3ltfGVufDB8fDB8fHww',
        isFav: false,
    },
    {
        name: 'Back & Biceps',
        image: 'https://img.freepik.com/premium-photo/equipment-gym_946657-140.jpg',
        isFav: false,
    },
    {
        name: 'Abs & Cardio',
        image: "https://png.pngtree.com/background/20230610/original/pngtree-gym-treadmills-are-lined-in-an-empty-gym-picture-image_3036059.jpg",
        isFav: false,
    },
    {
        name: 'Glutes & Hamstrings',
        image: 'https://static.vecteezy.com/system/resources/previews/021/488/003/large_2x/metal-dumbbells-with-background-blurred-gym-interior-free-photo.jpg',
        isFav: false,
    },
    {
        name: 'Chest & Triceps',
        image: 'https://m.media-amazon.com/images/I/715ycaYpZ2L._AC_UF894,1000_QL80_.jpg',
        isFav: false,
    },
    {
        name: 'Shoulders & Abs',
        isFav: false,
    },
    {
        name: 'Cardio',
        isFav: false,
    },
    {
        name: 'Chest & Shoulders',
        isFav: false,
    },
]

const schedules = [
    {   
        date: '2024-01-01',
        
    },
    {   
        date: '2024-01-02',
        
    },
    {   
        date: '2024-01-03',
        
    },
    {   
        date: '2024-01-04',
       
    },
    {   
        date: '2024-01-05',
        
    },
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
for (let i = 0; i < GlutesAndQuadsExercises.length && i < 7; i++){
    await GlutesAndQuadsExercises[i].addProgram(GlutesAndQuadsProgram)
}


const BackAndBicepsProgram = await Program.findOne({
    where: {name: 'Back & Biceps'}
})
const BackAndBicepsExercises = await Exercise.findAll ({
    where: { category: { [Op.or]: ['Back', 'Biceps']}}
})
for (let i =0; i < BackAndBicepsExercises.length && i < 7; i++){
    await BackAndBicepsExercises[i].addProgram(BackAndBicepsProgram)
}


const AbsAndCardioProgram = await Program.findOne({
    where: { name: 'Abs & Cardio'}
})
const AbsAndCardioExercises = await Exercise.findAll({
    where: { category : {[Op.or]: ['Abs-1', 'Cardio']}}
})
for (let i=0; i < AbsAndCardioExercises.length && i < 7; i++){
    await AbsAndCardioExercises[i].addProgram(AbsAndCardioProgram)
}


const GlutesAndHamstringsProgram = await Program.findOne({
    where: { name: 'Glutes & Hamstrings'}
})
const GlutesAndHamstringsExercises = await Exercise.findAll({
    where: {category: {[Op.or]: ['Glutes-1', 'Hamstrings']}}
})
for (let i=0; i < GlutesAndHamstringsExercises.length && i < 7; i++){
    await GlutesAndHamstringsExercises[i].addProgram(GlutesAndHamstringsProgram)
}


const ChestAndTricepProgram = await Program.findOne({
    where: { name: 'Chest & Triceps'}
})
const ChestAndTricepExercises = await Exercise.findAll({
    where: {category: {[Op.or]: ['Chest', 'Tricep']}}
})
for (let i=0; i < ChestAndTricepExercises.length && i < 7; i++){
    await ChestAndTricepExercises[i].addProgram(ChestAndTricepProgram)
}


const ShouldersAndAbsProgram = await Program.findOne({
    where: { name: 'Shoulder & Abs'}
})
const ShouldersAndAbsExercises = await Exercise.findAll({
    where: {category: {[Op.or]: ['Shoulder', 'Abs-2']}}
})
for (let i=0; i < ShouldersAndAbsExercises.length && i < 7; i++){
    await ShouldersAndAbsExercises[i].addProgram(ShouldersAndAbsProgram)
}


const CardioProgram = await Program.findOne({
    where: { name: 'Cardio'}
})
const CardioExercises = await Exercise.findAll({
    where: {category: 'Cardio' }
})
for (let i=0; i < CardioExercises.length && i < 7; i++){
    await CardioExercises[i].addProgram(CardioProgram)
}


const ChestAndShouldersProgram = await Program.findOne({
    where: { name: 'Chest & Shoulders'}
})
const ChestAndShouldersExercises = await Exercise.findAll({
    where: {category: {[Op.or]: ['Chest', 'Shoulder']} }
})
for (let i=0; i < ChestAndShouldersExercises.length && i < 7; i++){
    await ChestAndShouldersExercises[i].addProgram(ChestAndShouldersProgram)
}

// await Goal.bulkCreate(goals)

// console.log(newSchedules)

await sequelize.close()