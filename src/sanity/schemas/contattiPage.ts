const contattiPage = {
  name: 'contattiPage',
  title: 'Pagina contatti',
  type: 'document',
  fields: [
    { name: 'hero_tagline', title: 'Tagline', type: 'string' },
    { name: 'hero_titolo', title: 'Titolo', type: 'string' },
    { name: 'hero_descrizione', title: 'Descrizione', type: 'text', rows: 3 },
    {
      name: 'servizi_opzioni',
      title: 'Opzioni "Servizio richiesto" (form)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'urgenza_opzioni',
      title: 'Opzioni "Urgenza" (form)',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'seo', title: 'SEO', type: 'seo' },
  ],
  preview: {
    prepare: () => ({ title: 'Pagina contatti' }),
  },
}

export default contattiPage
