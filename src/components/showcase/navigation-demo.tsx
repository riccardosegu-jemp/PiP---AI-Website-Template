"use client"

import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbHome,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export function NavigationDemo() {
  return (
    <div className="flex flex-col gap-10">

      {/* Breadcrumb */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500 uppercase tracking-wider">Breadcrumb</p>

        {/* Base */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbHome />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/servizi">Servizi</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Consulenza Industriale</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Con testo home */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/case-study">Case Study</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/case-study/manifatturiero">Manifatturiero</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Automazione linea produttiva</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Tabs — underline */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500 uppercase tracking-wider">Tabs — Underline</p>
        <Tabs defaultValue="panoramica">
          <TabsList variant="underline">
            <TabsTab value="panoramica" variant="underline">Panoramica</TabsTab>
            <TabsTab value="servizi" variant="underline">Servizi</TabsTab>
            <TabsTab value="risultati" variant="underline">Risultati</TabsTab>
            <TabsTab value="team" variant="underline">Team</TabsTab>
          </TabsList>
          <TabsPanel value="panoramica">
            <div className="py-4">
              <p>Contenuto della tab <strong>Panoramica</strong> — descrizione generale del progetto o servizio.</p>
            </div>
          </TabsPanel>
          <TabsPanel value="servizi">
            <div className="py-4">
              <p>Contenuto della tab <strong>Servizi</strong> — elenco dei servizi offerti.</p>
            </div>
          </TabsPanel>
          <TabsPanel value="risultati">
            <div className="py-4">
              <p>Contenuto della tab <strong>Risultati</strong> — metriche e KPI raggiunti.</p>
            </div>
          </TabsPanel>
          <TabsPanel value="team">
            <div className="py-4">
              <p>Contenuto della tab <strong>Team</strong> — i professionisti coinvolti.</p>
            </div>
          </TabsPanel>
        </Tabs>
      </div>

      {/* Tabs — pill */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500 uppercase tracking-wider">Tabs — Pill</p>
        <Tabs defaultValue="tutto">
          <TabsList variant="pill">
            <TabsTab value="tutto" variant="pill">Tutto</TabsTab>
            <TabsTab value="attivi" variant="pill">Attivi</TabsTab>
            <TabsTab value="bozze" variant="pill">Bozze</TabsTab>
            <TabsTab value="archiviati" variant="pill">Archiviati</TabsTab>
          </TabsList>
          <TabsPanel value="tutto">
            <div className="py-4">
              <p>Mostra <strong>tutti</strong> i record disponibili.</p>
            </div>
          </TabsPanel>
          <TabsPanel value="attivi">
            <div className="py-4">
              <p>Mostra solo i record <strong>attivi</strong>.</p>
            </div>
          </TabsPanel>
          <TabsPanel value="bozze">
            <div className="py-4">
              <p>Mostra i record in <strong>bozza</strong>.</p>
            </div>
          </TabsPanel>
          <TabsPanel value="archiviati">
            <div className="py-4">
              <p>Mostra i record <strong>archiviati</strong>.</p>
            </div>
          </TabsPanel>
        </Tabs>
      </div>

    </div>
  )
}
