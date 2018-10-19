const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId} = require('../utils')


async function signup(parent, args, context, info){
    //1 
    const password = await bcrypt.hash(args.password, 10)
    
    //2
    const user = await context.db.mutation.createUser({
        data: {...args, password},
    }, `{id}`)

    //3 
    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET)

    //4
    return{
        token,
        user,
    }
}

async function login(parent, args, context, info){
    //3
    const user = await context.db.query.user({where: {email: args.email}}, `{id password}`)
    if (!user){
        throw new Error('No such user found')
    }

    //4
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid){
        throw new Error('Invalid password')
    }

    const token = jwt.sign({userId: user.id},  process.env.APP_SECRET)

    return {
        token,
        user,
    }
}

function driver(parent, args, context, info){
    const userId = getUserId(context)
    return context.db.mutation.createDriver(
        {
            data:{
                name: args.name,
                team: args.team,
                points: args.points,
                pictureURL: args.pictureURL,
                podiums: args.podiums,
                championshipWins: args.championshipWins,
                postedBy: {connect: {id: userId}},
                country: args.country,
            },
        },
        info,
    )
}

async function boost(parent, args, context, info){
    const userId = getUserId(context)

    const driverExists = await context.db.exists.FanBoost({
        user: {id: userId},
        driver: {id: args.driverId},
    })
    if (driverExists){
        throw new Error(`Already voted for Driver: ${args.driverId}`)
    }

    return context.db.mutation.createFanBoost(
        {
            data: {
                user: {connect: {id: userId}},
                driver: {connect: {id: args.driverId}},
            },
        },
        info,
    )
}

module.exports = {
    signup,
    login,
    driver,
    boost,
}