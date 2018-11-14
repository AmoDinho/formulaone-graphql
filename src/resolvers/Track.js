function circuits(parent, args, context, info){
    return context.db.query.circuits({where: {id_in: parent.circuitIds}}, info)
}

module.exports = {
    circuits,

}