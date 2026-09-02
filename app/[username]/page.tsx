import { supabase } from '@/app/lib/supabase'

export default async function ProducerPage({ params }) {
  const { username } = await params

  const { data: producer } = await supabase
    .from('producers')
    .select('*')
    .eq('username', username)
    .single()

  if (!producer) {
    return <div>Producer not found</div>
  }

  const { data: beats } = await supabase
    .from('beats')
    .select('*')
    .eq('producer_id', producer.id)

  return (
    <div style={{ padding: 40 }}>
      <h1>{producer.display_name}</h1>
      <p>{producer.bio}</p>

      {beats?.map((beat) => (
        <div key={beat.id}>
          <h3>{beat.title}</h3>
          <audio controls src={beat.audio_url} />
        </div>
      ))}
    </div>
  )
}
