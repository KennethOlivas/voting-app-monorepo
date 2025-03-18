import z from "zod"
import { useSearchParams } from "next/navigation";

const SortSchema = z.object({
    id: z.string(),
    desc: z.boolean()
})

type Sort = {
    sortBy?: string
    sortDirection?: string
}

export const useQuerySort = (): Sort => {
    const searchParams = useSearchParams()
    const sort = searchParams.get("sort")

    const sortBy = sort ? SortSchema.parse(JSON.parse(sort)[0]): null
    return {
        sortBy: sortBy?.id,
        sortDirection: sortBy?.desc ? "DESC" : "ASC"
    }
}