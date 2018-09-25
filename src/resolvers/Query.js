function feed (root, args, context, info)  {
    const where = args.filter
       ? {
           OR: [
               {name_contains: args.filter},
               {team_contains: args.filter},
           ],
       }
       : {}
    return context.db.query.drivers({where}, info)
}

module.exports ={
    feed,
}