import { db, schema, orm } from "@repo/db";

export default async function Links({ params }: OrgProps) {
    const { slug } = await params;

    const [org] = await db.select().from(schema.org).where(
      orm.eq(schema.org.orgSlug, slug)
    )

    const links = await db.select().from(schema.link).where(
      orm.eq(schema.link.ordId, org.id)
    )
    
    return (
    <>
      links: {slug}
    </>
  );
}

interface OrgProps {
  params: Promise<{ slug: string }>;
}