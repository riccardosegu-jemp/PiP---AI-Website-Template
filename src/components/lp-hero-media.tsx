import Image from "next/image"

type Props = {
  videoUrl?: string | null
  posterUrl?: string | null
  imageUrl: string
  imageAlt: string
}

// Media del hero della landing: mostra il VIDEO se è stato caricato in Sanity,
// altrimenti l'IMMAGINE (comportamento di default). Riconosce automaticamente
// YouTube/Vimeo (embed via iframe) e i file diretti .mp4/.webm/.ogg (tag <video>).
export function LpHeroMedia({ videoUrl, posterUrl, imageUrl, imageAlt }: Props) {
  const media = videoUrl ? resolveVideo(videoUrl) : null

  if (media?.type === "iframe") {
    return (
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-black border border-[var(--brand-border)]">
        <iframe
          src={media.url}
          title={imageAlt}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  if (media?.type === "file") {
    return (
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-black border border-[var(--brand-border)]">
        <video
          src={media.url}
          poster={posterUrl ?? undefined}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    )
  }

  // Nessun video → immagine (default)
  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--brand-surface)] border border-[var(--brand-border)]">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-contain p-8"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  )
}

// Capisce il tipo di URL e restituisce l'URL pronto da usare.
function resolveVideo(url: string): { type: "iframe" | "file"; url: string } {
  const u = url.trim()
  // File video diretto
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(u)) return { type: "file", url: u }
  // YouTube (watch, youtu.be, embed)
  const yt = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/)
  if (yt) return { type: "iframe", url: `https://www.youtube.com/embed/${yt[1]}` }
  // Vimeo
  const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vm) return { type: "iframe", url: `https://player.vimeo.com/video/${vm[1]}` }
  // URL già in formato embed o sconosciuto → provo come iframe
  return { type: "iframe", url: u }
}
