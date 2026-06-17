// Singleton per i metadati della pagina /servizi.
// Le card dei servizi vengono dai documenti "servizio"; qui c'è solo il SEO
// (ed eventuali futuri campi di intestazione pagina).
const serviziPage = {
  name: 'serviziPage',
  title: 'Pagina servizi',
  type: 'document',
  fields: [
    { name: 'seo', title: 'SEO', type: 'seo' },
  ],
  preview: {
    prepare: () => ({ title: 'Pagina servizi' }),
  },
}

export default serviziPage
