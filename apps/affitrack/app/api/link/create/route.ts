import { NextRequest, NextResponse } from "next/server";
import { createLink } from "../../../../validation/link";
import { db, orm, schema } from "@repo/db";

export async function POST(req: NextRequest) {
    try {

        const json = await req.json()

        const parseData = createLink.safeParse(json)
        if( !parseData.success ) {
            return NextResponse.json({
                message: "invalid input"
            }, { status: 400 })
        }

        const { orgSlug, url } = parseData.data

        const [org] = await db.select().from(schema.org).where(
            orm.eq(schema.org.orgSlug, orgSlug)
        )

        const [link] = await db.insert(schema.link).values({
            destinationUrl: url,
            ordId: org.id
        }).returning()

        return NextResponse.json({
            linkSlug: link.linkSlug
        }, {status: 200})


        
    } catch (error) {
        return NextResponse.json({
            message: "server error"
        }, {status: 500})
    }
}