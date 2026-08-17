import { NextRequest, NextResponse } from "next/server";
import { db, schema, orm, nanoid } from "@repo/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/authOption";

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();

        const session = await getServerSession(authOptions)

        if( !session?.user.email ) {
            return NextResponse.json({
                message: "unauthentication"
            }, {status: 403})
        }

        const { orgName } = body

        const user = await db.select().from(schema.appAccount).where(
            orm.eq(schema.appAccount.email, session.user.email)
        ).then(res => res[0])
        
        const id = nanoid.nanoid(10)
        
        console.log("db insert check");
        console.log("user.id:", user.id);
        console.log("user.id type :", typeof user.id);
        console.log("orgName:", orgName);
        console.log("orgSlug:", id);
        
        const [newOrg] = await db.insert(schema.org).values({
            name: orgName,
            accountId: user.id,
            orgSlug: id
        }).returning()

        console.log("db new org ", newOrg);
        


        
        return NextResponse.json({
            orgSlug: newOrg.orgSlug
        }, {status: 200})

        
    } catch (error) {
        return NextResponse.json({
            message: "server error"
        }, { status: 500 })
    }
}