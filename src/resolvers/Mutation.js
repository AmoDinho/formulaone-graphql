const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId} = require('../utils')
const {randomBytes} = require('crypto')
const {promisify} = require('util')
const {transport, mailTemp} = require('../mail')

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
                number: args.number,
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

 function updateDriver(parent,args,context,info){
    //const userId = getUserId(context);
    
    const updates = {...args};

    delete updates.id;

    return context.db.mutation.updateDriver(
        {
            data:updates,
            where: {
                id:args.id                
            },
        },
        info
    );
};

async function deleteDriver(parnet,args, context, info){
    const userId = getUserId(context);
    //Get the driver
    //look at the boost function

    //get the drivers boosts

    //Then delete the driver 
       const where = {id: args.id};
   
        const boosts = await context.db.exists.FanBoost({
            
            user: {id: userId},
            driver: {id: args.driverId},

        })



        if (!boosts){
            throw new Error("this driver does not exist");
        }
      
        return context.db.mutation.deleteDriver({where},info) 
    
}


async function requestReset(parent, args, context, info){
    //check if the user exisits
    const user = await context.db.query.user({where: {email:args.email}});
    if (!user){
        throw new Error(`No such user found with this email: ${args.email}`);
    }
   
    const randomBytesPromisefied = promisify(randomBytes)
    resetToken = (await randomBytesPromisefied(20)).toString('hex')
    resetTokenExpiry = Date.now() + 3600000
    const res = await context.db.mutation.updateUser({
        where: {email: args.email},
        data: {resetToken,resetTokenExpiry}
    });

    const mailRes = await transport.sendEmail({
        from: 'u14284783@tuks.co.za',
        to: user.email,
        subject: 'Your Password Reset Token',
        TextBody: mailTemp(`your password reset token is here! 
        \n\n
        <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here to reset</a>`),
    }).then(response => {
        console.log(response.message)
    })

    console.log(mailRes)
    return {message:'Thanks'}

}


async function resetPassword(parent, args, context,info){
 
    //verify that passwords to indeed match
   if(args.password !== args.confirmPassword){
       throw new Error("Your passwords do not match");
   }

   //verify if the reset token is valid and if it has expired
   const [user] = await context.db.query.users({
       where: {
           resetToken: args.resetToken,
           resetTokenExpiry_gte: Date.now() - 3600000,
       },
   });
   if (!user){
       throw new Error('This token might be invalid or expired')
   }

   //hash their new password
   const password = await bcrypt.hash(args.password, 10)

   // save the passowrd and remove old resetToken fields
   const updateUser = await context.db.mutation.updateUser({
       where: {email:user.email},
       data: {
           password,
           resetToken: null,
           resetTokenExpiry: null,
       },
   })
   //Also give them a new JWT
   const token = jwt.sign({userId: updateUser.id},process.env.APP_SECRET)
   
   return updateUser
}

async function deleteUser (parent,args,  context  ,info ){
    //lets check if the user exisist and has the password

    //const userId = getUserId(context)
    try{

        const userExists = await context.db.query.users({
            
            where: {id: args.id},
           
        })
         
    
        if (!userExists){
            throw new Error("You do not exisit")
        }
    
      
        const vaild = await bcrypt.compare(args.password,userExists[0].password)
        
       
        if (!vaild){
            throw new Error("Incorrect password");
        }
    
       
    
        return context.db.mutation.deleteUser({
            where: {id: args.id}
        })
    } catch (e){
       throw new Error(e)
    }


}

function createCircuit(parent,args,context,info){
    const userId = getUserId(context)

    return context.db.mutation.createCircuit({
        data : {
            name: args.name,
            country: args.country,
            numOfLaps: args.numOfLaps,
            description: args.description,
            raceDistance: args.raceDistance,
            circuitLength: args.circuitLength,
            lapRecord: args.lapRecord,
            address: args.address,
            longitude: args.longitude,
            latitude: args.latitude,
            flyAway: args.flyAway,
            trackMap: args.trackMap,
            trackImage: args.trackImage
        }
    },info)
}


updateCircuit = (parent,args,context,info)=>{
    const userId = getUserId(context)

    const updates = {...args}

    delete updates.id

    return context.db.mutation.updateCircuit({
        data:updates,
        where: {
            id:args.id
        }

    },info)
}


module.exports = {
    signup,
    login,
    driver,
    boost,
    updateDriver,
    deleteDriver,
    requestReset,
    resetPassword,
    deleteUser,
    createCircuit,
    updateCircuit
}