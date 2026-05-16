"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogClose,
} from "@/components/ui/dialog"

export function DialogDemo() {
  return (
    <div className="flex flex-wrap gap-4">

      {/* Dialog base */}
      <Dialog>
        <DialogTrigger render={<Button variant="outline" size="sm">Apri Dialog</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conferma azione</DialogTitle>
            <DialogDescription>Questa operazione non può essere annullata.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>Sei sicuro di voler procedere? Tutti i dati associati verranno eliminati definitivamente.</p>
          </DialogBody>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" size="sm">Annulla</Button>} />
            <Button size="sm" variant="destructive">Elimina</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog informativo */}
      <Dialog>
        <DialogTrigger render={<Button size="sm">Dettagli servizio</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Consulenza Industriale B2B</DialogTitle>
            <DialogDescription>Servizio premium per PMI manifatturiere</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>Il nostro servizio di consulenza include analisi del processo produttivo, identificazione delle inefficienze e piano di miglioramento personalizzato.</p>
            <ul className="mt-3 flex flex-col gap-1.5 text-sm text-gray-600 list-disc list-inside">
              <li>Audit iniziale gratuito</li>
              <li>Report dettagliato entro 5 giorni lavorativi</li>
              <li>Piano d&apos;azione con ROI stimato</li>
            </ul>
          </DialogBody>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" size="sm">Chiudi</Button>} />
            <Button size="sm" variant="accent">Richiedi preventivo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}
