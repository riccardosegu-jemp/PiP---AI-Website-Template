import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

// Tipi singleton: una sola istanza. Creazione/eliminazione disabilitate dallo Studio.
const SINGLETON_TYPES = ['siteSettings', 'homepage', 'chiSiamo', 'contattiPage', 'serviziPage', 'caseStudyPage', 'landingProdotto']

export default defineConfig({
  name: 'default',
  title: 'BrandPMI',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenuti')
          .items([
            S.documentTypeListItem('siteSettings').title('Impostazioni sito'),
            S.documentTypeListItem('homepage').title('Homepage'),
            S.documentTypeListItem('chiSiamo').title('Chi siamo'),
            S.documentTypeListItem('contattiPage').title('Pagina contatti'),
            S.documentTypeListItem('serviziPage').title('Pagina servizi (SEO)'),
            S.documentTypeListItem('caseStudyPage').title('Pagina case study (SEO)'),
            S.documentTypeListItem('landingProdotto').title('Landing — Lancio prodotto'),
            S.divider(),
            S.documentTypeListItem('servizio').title('Servizi'),
            S.documentTypeListItem('caseStudy').title('Case Study'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // Nasconde i singleton dal menu "crea nuovo": esistono già in copia unica.
    templates: (templates) =>
      templates.filter((t) => !SINGLETON_TYPES.includes(t.schemaType)),
  },
  document: {
    // Rimuove duplicazione/creazione/eliminazione sui singleton.
    actions: (input, context) =>
      SINGLETON_TYPES.includes(context.schemaType)
        ? input.filter(({ action }) =>
            ['publish', 'discardChanges', 'restore'].includes(action as string),
          )
        : input,
  },
})
