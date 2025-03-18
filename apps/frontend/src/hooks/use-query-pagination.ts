"use client"
import { useSearchParams } from "next/navigation"
import z from "zod"

const PaginationSchema = z.object({
    page: z.string().nullable().transform((val) => val ?? "1"),
    perPage: z.string().nullable().transform((val) => val ?? "10"),
})

type Pagination = z.infer<typeof PaginationSchema>

export const useQueryPagination = (): Pagination => {
    const searchParams = useSearchParams()
    const page = searchParams.get("page")
    const perPage = searchParams.get("perPage")

    const pagination = PaginationSchema.parse({
        page,
        perPage
    })

    return {
        page: pagination.page, // => 1 
        perPage: pagination.perPage // => 10
    }
}
