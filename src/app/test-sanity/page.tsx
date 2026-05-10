import { client } from '@/sanity/client'

export default async function TestSanity() {
  let status = ''
  let error = ''

  try {
    await client.fetch('*[_type == "sanity.imageAsset"][0]')
    status = 'Sanity connesso ✅'
  } catch (e: unknown) {
    if (e instanceof Error) {
      error = e.message
    } else {
      error = 'Errore sconosciuto'
    }
    status = 'Errore connessione ❌'
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Sanity</h1>
      <p className="text-lg">{status}</p>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      <p className="mt-4 text-zinc-500 text-sm">Project ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}</p>
    </div>
  )
}
