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
    return context.db.subscription.boost(
        {where : {mutation_in: ['CREATED']}
        },
        info,
    )
}

const newBoost = {
    subscribe: newBoostSubcribe
}

module.exports = {
    newDriver,
    newBoost,
}