const {forwardTo} = require('prisma-binding');

async function feed (root, args, context, info)  {
    const where = args.filter
       ? {
           OR: [
               {name_contains: args.filter},
               {team_contains: args.filter},
           ],
       }
       : {}

    const queriedDrivers = await context.db.query.drivers(
        {where, skip: args.skip, first: args.first, orderBy: args.orderBy},
        `{id}`
    )

    const countSelectionSet = `
    {
        aggregate {
            count
        }
    }
    `

    const driversConncetion = await context.db.query.driversConnection({}, countSelectionSet)

   return {
       count: driversConncetion.aggregate.count,
       driverIds: queriedDrivers.map(driver => driver.id),
   }
}

function driver(parent, args,context,info){
    return context.db.query.driver({where:{id: args.id}},info)
}

function me (parent,args,context,info){
    if(!context.request.userId){
        return null
    }
    return context.db.query.user({
        where: {id:context.request.userId},
    },info)
}

async function tracks(root,args,context,info) {
    const where = args.filter
       ? {
           OR: [
               {name_contains:args.filter},
               {country_contains: args.filter},
           ],
       }
       : {}


    const queriedCircuits = await context.db.query.circuits({
        where, skip: args.skip,first: args.first, orderBy: args.orderBy
    },`{id}`)

    const countSelectionSet=`
    {
        aggregate{count}
    }
    `

    const circuitsConnection = await context.db.query.circuitsConnection({},countSelectionSet)
    console.log(circuitsConnection)

    return {
        count: circuitsConnection.aggregate.count,
        circuitIds: queriedCircuits.map(circuit => circuit.id)
    }
}

circuit = (parent, args, context,info) => {
    return context.db.query.circuit({where: {id:args.id}},info)
}

module.exports ={
    driver,
    feed,
    me,
    circuit,
    tracks
}