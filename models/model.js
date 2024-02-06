import Sequelize, { DataTypes, Model } from 'sequelize'
import util from 'util'

const sequelize = new Sequelize('postgresql:///workout_app', {
    logging: false,
    define: { 
        underscored: true ,
        timestamps: false,
    },
    dialectOptions:{useUTC:true}
    //this makes it use british time meaning the time is the same for every user
})

class Program extends Model {
    //these lines makes the terminal in VS code look prettier
    //aka easier to read
    [util.inspect.custom]() {
        return this.toJSON();
      }
}

Program.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(30),
            unique: true,
        },
        image: {
            type: DataTypes.TEXT,
        },
        isFav: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        modelName: 'program',
        sequelize: sequelize,
        timestamps: false,
    })

class Exercise extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
      }
}

Exercise.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
    
        },
        reps: {
            type: DataTypes.STRING
        },
        sets: {
            type: DataTypes.INTEGER
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },    
    {
        modelName: 'exercise',
        sequelize: sequelize,
        timestamps: false
    })

class Schedule extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
      }
}

Schedule.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATEONLY,
            unique: true,
        }
    },
    {
        modelName:'schedule',
        sequelize: sequelize,
        timestamps: false
    })

class Goal extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
      }
}

Goal.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        goal: {
            type: DataTypes.STRING,
            allowNull: false,

        }
    },
    {
        modelName: 'goal',
        sequelize: sequelize,
        timestamps: false
    })

class User extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
      }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        fname:{
            type: DataTypes.STRING,
        },
        lname:{
            type: DataTypes.STRING,
        },
    },
    {
        modelName:'user',
        sequelize: sequelize,
        timestamps: false
    })

Schedule.belongsTo(Program, { foreignKey: 'programId' })
Program.hasMany(Schedule, { foreignKey: 'programId' })

User.hasMany(Goal, { foreignKey: 'userId' })
Goal.belongsTo(User, { foreignKey: 'userId' })

Exercise.hasMany(Goal, { foreignKey: 'exerciseId' })
Goal.belongsTo(Exercise, { foreignKey: 'exerciseId' })

Schedule.hasMany(Goal, { foreignKey: 'scheduleId' })
Goal.belongsTo(Schedule, { foreignKey: 'scheduleId' })

Exercise.belongsToMany (Program, { through: 'ExercisePrograms' })
Program.belongsToMany (Exercise, { through: 'ExercisePrograms' })

export { sequelize, Schedule, Program, User, Exercise, Goal }
