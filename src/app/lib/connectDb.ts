import mongoose from 'mongoose'

export async function connectDb(){
    try{
        if(mongoose.connection.readyState === 0){
            const connection = process.env.CONNECTION_STRING
            if(connection){
                await mongoose.connect(connection)
                console.log("Conexion con mongoDb exitosa")
            }
        }
    }catch(e:any){
        console.log(e)
    }
}