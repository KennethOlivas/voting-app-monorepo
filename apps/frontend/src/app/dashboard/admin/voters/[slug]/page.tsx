import VoterUpset from "@/components/features/voters/voter-upset"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <VoterUpset slug={slug} />
  )
}
