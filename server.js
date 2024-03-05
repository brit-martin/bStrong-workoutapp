import express from "express";
import ViteExpress from "vite-express";
import { Exercise, Program, Schedule, Goal, User } from "./models/model.js";
import { Op } from "sequelize";
import session from "express-session";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({ secret: "woorrrkkkk", saveUninitialized: true, resave: false })
);

//middleware function that checks if the user is logged in.
function loginRequired(req, res, next) {
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
}

// this loads when you click on the exercises button and sends scheduleId, goal, name
// reps, sets, programId, and exerciseId to the front end.
app.get("/workout", loginRequired, async (req, res) => {
  let programId = +req.query.programId;
  let date = req.query.date;

  let program = await Program.findOne({
    where: { id: programId },
  });

  let scheduleDate = await Schedule.findOne({
    where: { date: date },
    include: {
      model: Goal,
    },
  });

  let programRegimen = await program.getExercises({
    attributes: ["name", "reps", "sets"],
  });

  let programDateArray = [];
  for (let i = 0; i < programRegimen.length; i++) {
    let programDateObj = {};
    let programObj = programRegimen[i];

    let goalNum = "";

    scheduleDate.goals.forEach((goalObj) => {
      if (+goalObj.exerciseId === programObj.ExercisePrograms.exerciseId) {
        goalNum = goalObj.goal;
        return;
      }
    });

    programDateObj.scheduleId = scheduleDate.id;
    programDateObj.goal = goalNum;
    programDateObj.name = programObj.name;
    programDateObj.reps = programObj.reps;
    programDateObj.sets = programObj.sets;
    programDateObj.programId = programObj.ExercisePrograms.programId;
    programDateObj.exerciseId = programObj.ExercisePrograms.exerciseId;

    programDateArray.push(programDateObj);
  }
  res.status(200).send(programDateArray);
});

//this loads all the programs when you are on the home page
//this sends the date, name of exercise, programId, program image, isFav
app.get("/this-weeks-program", loginRequired, async (req, res) => {
  let datesOfThisWeek = [
    "2024-01-01",
    "2024-01-02",
    "2024-01-03",
    "2024-01-04",
    "2024-01-05",
  ];

  let thisWeeksSchedules = await Schedule.findAll({
    where: { date: { [Op.in]: datesOfThisWeek } },
    order: [["date", "ASC"]],
  });

  let dateNameObjs = [];
  for (let i = 0; i < thisWeeksSchedules.length; i++) {
    let oneDateNameObj = {};
    let scheduleObj = thisWeeksSchedules[i];

    let theProgram = await scheduleObj.getProgram();

    oneDateNameObj.date = thisWeeksSchedules[i].date;
    oneDateNameObj.name = theProgram.name;
    oneDateNameObj.programId = theProgram.id;
    oneDateNameObj.image = theProgram.image;
    oneDateNameObj.isFav = theProgram.isFav;

    dateNameObjs.push(oneDateNameObj);
  }

  res.status(200).send(dateNameObjs);
});

//this changes the goal column to the input the user put in
//this sends back the goal table with the updated goal, userId, exerciseId, and the scheduleId
app.post("/new-rep", loginRequired, async (req, res) => {
  let newGoal = req.body.goal;
  let scheduleId = req.body.scheduleId;
  let exerciseId = req.body.exerciseId;
  let userId = req.body.userId;

  let newGoalDbObject = await Goal.findOrCreate({
    where: { exerciseId },
    defaults: {
      goal: newGoal,
      userId: userId,
      exerciseId: exerciseId,
      scheduleId: scheduleId,
    },
  });

  if (!newGoalDbObject[1]) {
    await Goal.update(
      { goal: newGoal },
      {
        where: { exerciseId },
      }
    );
  }

  res.status(200).send(newGoalDbObject);
});

//this changes the isFav column from false to true when user clicks on the button
//this sends the updated table to the front end with the id, name, isFave, and image
app.put("/favorite-regimen", loginRequired, async (req, res) => {
  let favExerciseId = req.query.id;

  let favoriteProgramObj = await Program.findOne({
    where: { id: favExerciseId },
  });
  let updatedFavTable = await favoriteProgramObj.update({
    isFav: !favoriteProgramObj.isFav,
  });

  res.status(200).send(updatedFavTable);
});

//this erases with the user clicks the reset button by destroy the goal column where the
//scheduleId matches with the scheduleId they clicked on
//send back date, name, programId, and image
app.delete("/reset-rep", loginRequired, async (req, res) => {
  let scheduleId = req.query.scheduleId;

  await Goal.destroy({
    where: { scheduleId: scheduleId },
  });

  res.status(200).send({
    message: "goals were reset",
  });
});

app.get("/get-favorited", loginRequired, async (req, res) => {
  let favoriteBoolean = req.query.isFav;

  //getting all the Program rows that are favorited
  let favoritePrograms = await Program.findAll({
    where: { isFav: favoriteBoolean },
  });

  //we want to find the most recent Schedule associated with each Program
  //let's make an array to hold those
  let mostRecentFavoriteSchedules = [];

  //looping through through all the favorite Programs
  for (let i = 0; i < favoritePrograms.length; i++) {
    //for every favorite Program, we need to find
    //the most recent schedule associated with it

    //TODO: this simply grabs the first Schedule the DB gives us, but it should
    //      actually grab the most recent (by date), which isn't working yet
    //      this will do for now...
    let firstSchedule = (
      await favoritePrograms[i].getSchedules(null, { order: [["date", "ASC"]] })
    )[0];

    //if firstSchedule was able to be found (if it isn't undefined)
    if (firstSchedule) {
      //then push it into our collection of "most recent Schedules" associated with our favorited Programs
      mostRecentFavoriteSchedules.push(firstSchedule);
    }
  }

  //now that we are done looping, mostRecentFavoriteSchedules is all of the most recent schedules that are associated
  //with a liked Program

  //now we are going to go backwards and get the Programs again from these schedules,
  //and combine the Program and Schedule data into objects in dateNameObjs (similar how we did in '/this-weeks-program' endpoint)

  let dateNameObjs = [];
  for (let i = 0; i < mostRecentFavoriteSchedules.length; i++) {
    let oneDateNameObj = {};
    let scheduleObj = mostRecentFavoriteSchedules[i];

    let theProgram = await scheduleObj.getProgram();

    oneDateNameObj.date = mostRecentFavoriteSchedules[i].date;
    oneDateNameObj.name = theProgram.name;
    oneDateNameObj.programId = theProgram.id;
    oneDateNameObj.image = theProgram.image;
    oneDateNameObj.isFav = theProgram.isFav;

    dateNameObjs.push(oneDateNameObj);
  }

  res.status(200).send(dateNameObjs);
});

// app.get('/user-session', async (req, res) => {
//     res.send(req.session.userId)
// })

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  console.log(req.body);
  if (user && user.password === password) {
    req.session.userId = user.id; //makes session (aka cookie aka session id number)
    console.log(user.id);
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

app.post("/logout", loginRequired, async (req, res) => {
  req.session.destroy();
  res.send({ success: true });
});

app.post("/signup", async (req, res) => {
  const { email, password, fname, lname } = req.body;
  if (!email || !password || !fname || !lname) {
    res.send("All fields are required to sign up");
    return;
  }
  const alreadyUser = await User.findOne({ where: { email: email } });
  if (!alreadyUser) {
    let newUser = await User.create({
      email: email,
      password: password,
      fname: fname,
      lname: lname,
    });
    req.session.userId = newUser.id;
    res.send("Signed Up Sucessfully");
  } else {
    res.send("User already Exists");
  }
});

ViteExpress.listen(app, 8080, () => {
  console.log("Server is up on 8080");
});
