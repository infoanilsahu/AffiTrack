export default async function Links({ params }: OrgProps) {
    const { slug } = await params;
    
    return (
    <>
      links: {slug}
    </>
  );
}

interface OrgProps {
  params: Promise<{ slug: string }>;
}