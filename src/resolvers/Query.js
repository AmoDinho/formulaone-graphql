function feed (root, args, context, info)  {
    const where = args.filter
       ? {
           OR: [
               {name_contains: args.filter},
               {team_contains: args.filter},
           ],
       }
       : {}
    return context.db.query.drivers(
        {where, skip:args.skip, first: args.first, orderBy: args.orderBy}, 
        info)
}

module.exports ={
    feed,
}