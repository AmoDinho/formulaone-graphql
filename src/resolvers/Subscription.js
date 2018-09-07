function newDriverSubscribe (parent, args, context, info){
    return context.db.subscription.driver(
        { where: {mutation_in: ['CREATED']}},
        info,
    )
}

const newDriver = {
    subscribe: newDriverSubscribe
}

module.exports = {
    newDriver,
}