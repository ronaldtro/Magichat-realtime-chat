import { NextResponse } from "next/server";
import { connectDb } from "@/app/lib/connectDb";
import messages from "@/app/models/Messages";

export async function POST(req:any){
    const reqObj = await req.json()
    try{
        await connectDb();
        const saveMessages = await messages.create(reqObj)
        return NextResponse.json({
            status: 200,
            data: saveMessages
        })
    }catch(e: any){
        return NextResponse.json({
            status: 500,
            msg: e
        })
    }
}

export async function GET(){
    try{
        await connectDb()
        const msgs = await messages.find()
        return NextResponse.json({
            status: 200,
            data: msgs
        })
    }catch(e:any){
        return NextResponse.json({
            status: 500,
            msg: e
        })
    }
}