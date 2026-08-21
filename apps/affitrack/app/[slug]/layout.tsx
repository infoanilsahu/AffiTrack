import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/authOption";
import { redirect, notFound } from "next/navigation";
import { db, schema, orm } from "@repo/db";

export default async function SlugLayout({ children, params }: SlugLayoutProps) {
    const { slug } = await params;

    const session = await getServerSession(authOptions)
    if( !session || !session.user.email ) {
        redirect('/signin')
    }

    const [user] = await db.select().from(schema.appAccount).where(
        orm.eq(schema.appAccount.email, session.user.email)
    )

    const [org] = await db.select().from(schema.org).where(
        orm.and(
            orm.eq(schema.org.orgSlug, slug),
            orm.eq(schema.org.accountId, user.id)
        )
    )

    if( !org ) {
        notFound()
    }

    return <>
        <div className="flex">
            <div className="flex-1 bg-amber-300">
                <div className="">{user.email}</div>
                <div className="">{org.name}</div>
            </div>
            <div className="flex-6">{children}</div>
        </div>
    </>
}

interface SlugLayoutProps {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}