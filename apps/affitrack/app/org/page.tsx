import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/authOption";
import { db, schema, orm } from "@repo/db";

export default async function ORG() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/signin");
    }

    const [user] = await db
        .select()
        .from(schema.appAccount)
        .where(
            orm.eq(schema.appAccount.email, session.user.email)
        );

    if (!user) {
        redirect("/signin");
    }

    const firstOrg = await db.query.org.findFirst({
        where: orm.eq(schema.org.accountId, user.id),
    });

    if (!firstOrg) {
        // redirect to create organization
        redirect("/org/create");
    }

    redirect(`/${firstOrg.orgSlug}/links`);
}