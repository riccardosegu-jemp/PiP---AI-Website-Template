// Singleton per l'intestazione e i metadati della pagina /servizi.
// Le card dei servizi vengono dai documenti "servizio"; qui c'è l'hero della
// pagina (tagline/titolo/descrizione) e il SEO.
const serviziPage = {
  name: 'serviziPage',
  title: 'Pagina servizi',
  type: 'document',
  fields: [
    { name: 'hero_tagline', title: 'Tagline', type: 'string' },
    { name: 'hero_titolo', title: 'Titolo', type: 'string' },
    { name: 'hero_descrizione', title: 'Descrizione', type: 'text', rows: 3 },
    { name: 'seo', title: 'SEO', type: 'seo' },
  ],
  preview: {
    prepare: () => ({ title: 'Pagina servizi' }),
  },
}

export default serviziPage
