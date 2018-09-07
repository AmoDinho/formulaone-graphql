function feed (root, args, context, info)  {
    return context.db.query.drivers({}, info)
}

module.exports ={
    feed,
}