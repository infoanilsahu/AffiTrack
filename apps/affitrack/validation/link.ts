import z from "zod"

export const createLink = z.object({
    url: z.url().nonempty(),
    orgSlug: z.string().nonempty()
})