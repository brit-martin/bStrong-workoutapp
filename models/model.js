import Sequelize, { DataTypes, Model } from 'sequelize'

const sequelize = new Sequelize('postgresql:///workout_app', { define: { underscored: true }})

class Program extends Model {}

Program.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING(30),
            unique: true,
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

class Exercise extends Model {}

Exercise.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        reps: {
            type: DataTypes.INTEGER
        },
        sets: {
            type: DataTypes.INTEGER
        },
    },    
    {
        modelName: 'exercise',
        sequelize: sequelize,
        timestamps: false
    })

class Schedule extends Model {}

Schedule.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Date: {
            type: DataTypes.INTEGER,
            unique: true,
        }
    },
    {
        modelName:'schedule',
        sequelize: sequelize,
        timestamps: false
    })

class Goal extends Model {}

Goal.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        goal: {
            type: DataTypes.INTEGER
        }
    },
    {
        modelName:'goal',
        sequelize: sequelize,
        timestamps: false
    })

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        }
    },
    {
        modelName:'user',
        sequelize: sequelize,
        timestamps: false
    })

Schedule.hasMany(Program, { foreignKey: 'scheduleId' })    
Program.belongsTo(Schedule, { foreignKey: 'scheduleId' }) 

Program.hasMany(Exercise, {foreignKey:'programId'})
Exercise.belongsTo(Program, {foreignKey:'programId'})

User.hasMany(Goal, {foreignKey: 'userId'})
Goal.belongsTo(User, {foreignKey: 'userId'})

Exercise.hasMany(Goal, {foreignKey: 'exerciseId'})
Goal.belongsTo(Exercise, {foreignKey: 'exerciseId'})

Schedule.hasMany(Goal, {foreignKey: 'scheduleId'})
Goal.belongsTo(Schedule, {foreignKey: 'scheduleId'})

await sequelize.sync({ force: true })
await sequelize.close()
