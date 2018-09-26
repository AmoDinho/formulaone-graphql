function drivers(parent, args, context, info){
    return context.db.query.drivers({where: {id_in: parent.driverIds}}, info)
}

module.exports = {
    drivers,

}