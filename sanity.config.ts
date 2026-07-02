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
        // Singleton: apre direttamente il documento (id fisso = nome del tipo),
        // così lo Studio lo crea in bozza al primo salvataggio invece di
        // mostrare una lista vuota senza modo di crearlo.
        const singleton = (id: string, title: string) =>
          S.listItem()
            .title(title)
            .id(id)
            .child(S.document().schemaType(id).documentId(id))

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
                    .child(S.document().schemaType(pageId).documentId(pageId)),
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
