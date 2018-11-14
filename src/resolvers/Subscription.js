function newDriverSubscribe (parent, args, context, info){
    return context.db.subscription.driver(
        { where: {mutation_in: ['CREATED']}},
        info,
    )
}

const newDriver = {
    subscribe: newDriverSubscribe
}


function newBoostSubcribe (parent, args, context, info){
    return context.db.subscription.fanBoost(
        {where : {mutation_in: ['CREATED']}},
        info,
    )
}

const newBoost = {
    subscribe: newBoostSubcribe
}

newCircuitSubscribe = (parent,args,context,info) => {
    return context.db.subscription.circuit({
        where: {mutation_in: ['CREATED']}
    },info)
}

const newCircuit = {
    subscribe: newCircuitSubscribe
}

module.exports = {
    newDriver,
    newBoost,
    newCircuit
}