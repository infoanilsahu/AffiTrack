import { CreateLink } from "../../../../components/pages/createLink";

export default async function CreateLinkPage({ params }: CreateLinkProp) {

    const { slug } = await params;

    return (
        <>
        <CreateLink orgSlug={slug} />
        </>
    );
}


interface CreateLinkProp {
    params: Promise<{ slug: string }>;
}