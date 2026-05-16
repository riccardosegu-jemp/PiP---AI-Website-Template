"use client"

import { useState } from "react"
import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export function NotificationsDemo() {
  const [dismissed, setDismissed] = useState<string[]>([])

  const dismiss = (id: string) => setDismissed((prev) => [...prev, id])

  return (
    <div className="flex flex-col gap-10">

      {/* Alert banners */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500 uppercase tracking-wider">Alert</p>
        <div className="flex flex-col gap-3 max-w-xl">
          <Alert variant="info" title="Informazione">
            Il sistema sarà in manutenzione il 20 maggio dalle 22:00 alle 24:00.
          </Alert>
          <Alert variant="success" title="Operazione completata">
            Il preventivo è stato inviato con successo al cliente.
          </Alert>
          <Alert variant="warning" title="Attenzione">
            Il contratto scadrà tra 7 giorni. Ricorda di rinnovarlo.
          </Alert>
          <Alert variant="danger" title="Errore">
            Impossibile caricare i dati. Riprova o contatta il supporto.
          </Alert>
          {!dismissed.includes("dismissible") && (
            <Alert
              variant="info"
              title="Questa notifica è chiudibile"
              dismissible
              onDismiss={() => dismiss("dismissible")}
            >
              Clicca la X per chiudere questo alert.
            </Alert>
          )}
        </div>
      </div>

      {/* Badge */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500 uppercase tracking-wider">Badge</p>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 w-20">Brand</span>
            <Badge variant="navy">Navy</Badge>
            <Badge variant="teal">Teal</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 w-20">Semantici</span>
            <Badge variant="success">Attivo</Badge>
            <Badge variant="warning">In scadenza</Badge>
            <Badge variant="danger">Errore</Badge>
            <Badge variant="neutral">Archiviato</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 w-20">Con dot</span>
            <Badge variant="success" dot>Online</Badge>
            <Badge variant="warning" dot>In attesa</Badge>
            <Badge variant="danger" dot>Offline</Badge>
            <Badge variant="neutral" dot>Inattivo</Badge>
          </div>
        </div>
      </div>

    </div>
  )
}
