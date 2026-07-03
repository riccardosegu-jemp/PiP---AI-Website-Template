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
      structure: (S, context) => {
        // Cerca il documento già esistente di questo tipo (i singleton creati
        // da Sanity hanno un _id casuale, NON uguale al nome del tipo). Se non
        // esiste ancora, apre un documento nuovo con id fisso = nome del tipo,
        // così lo Studio lo crea in bozza al primo salvataggio.
        // Ordina per data di creazione crescente: se per errore esistono due
        // documenti dello stesso tipo, prende sempre il più vecchio (quello
        // con i contenuti reali), non un eventuale duplicato vuoto più recente.
        const resolveSingletonId = async (typeName: string) => {
          const client = context.getClient({ apiVersion: '2024-01-01' })
          const existingId = await client.fetch<string | null>(
            `*[_type == $type] | order(_createdAt asc)[0]._id`,
            { type: typeName },
          )
          return existingId || typeName
        }

        const singleton = (typeName: string, title: string) =>
          S.listItem()
            .title(title)
            .id(typeName)
            .child(async () =>
              S.document()
                .schemaType(typeName)
                .documentId(await resolveSingletonId(typeName)),
            )

        // Sezione "Servizi"/"Case Study": un solo click mostra l'item "SEO
        // pagina" (singleton serviziPage/caseStudyPage) insieme ai documenti
        // veri e propri, nello stesso pane — niente livello in più.
        const sectionWithSeo = (pageId: string, title: string, itemsType: string) =>
          S.listItem()
            .title(title)
            .id(itemsType)
            .child(async () => {
              const client = context.getClient({ apiVersion: '2024-01-01' })
              const docs = await client.fetch<{ _id: string }[]>(
                `*[_type == $type] | order(_createdAt asc){ _id }`,
                { type: itemsType },
              )
              return S.list()
                .title(title)
                .items([
                  S.listItem()
                    .title('SEO pagina')
                    .id(pageId)
                    .child(S.document().schemaType(pageId).documentId(await resolveSingletonId(pageId))),
                  S.divider(),
                  ...docs.map((doc) => S.documentListItem().id(doc._id).schemaType(itemsType)),
                ])
            })

        return S.list()
          .title('Contenuti')
          .items([
            singleton('siteSettings', 'Impostazioni sito'),
            singleton('homepage', 'Homepage'),
            singleton('chiSiamo', 'Chi siamo'),
            singleton('contattiPage', 'Pagina contatti'),
            singleton('landingProdotto', 'Landing — Lancio prodotto'),
            S.divider(),
            sectionWithSeo('serviziPage', 'Servizi', 'servizio'),
            sectionWithSeo('caseStudyPage', 'Case Study', 'caseStudy'),
          ])
      },
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
