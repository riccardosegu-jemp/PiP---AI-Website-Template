const servizio = {
  name: 'servizio',
  title: 'Servizio',
  type: 'document',
  fields: [
    {
      name: 'titolo',
      title: 'Titolo',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titolo' },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'icona',
      title: 'Icona (anteprima homepage)',
      type: 'string',
      description: 'Icona mostrata nella card della homepage',
      options: {
        list: [
          { title: 'Impostazioni', value: 'settings2' },
          { title: 'Livelli', value: 'layers' },
          { title: 'Scudo', value: 'shield' },
          { title: 'Checklist', value: 'clipboard-check' },
          { title: 'Trapano', value: 'drill' },
          { title: 'Pacco', value: 'package-check' },
        ],
      },
    },
    {
      name: 'descrizione_breve',
      title: 'Descrizione breve (anteprima homepage)',
      type: 'text',
      rows: 2,
    },
    {
      name: 'descrizione_completa',
      title: 'Descrizione completa',
      type: 'text',
      rows: 4,
    },
    {
      name: 'punti_chiave',
      title: 'Punti chiave',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'immagine',
      title: 'Immagine',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Testo alternativo', type: 'string' }],
    },
    {
      name: 'ordine',
      title: 'Ordine di visualizzazione',
      type: 'number',
    },
    // Usato solo per arricchire il JSON-LD Service generato per ogni servizio
    // in /servizi — questi servizi non hanno una pagina propria, quindi non
    // producono un <title>/<meta description> indicizzabile a parte.
    { name: 'seo', title: 'SEO (dati strutturati)', type: 'seo' },
  ],
  orderings: [
    {
      title: 'Ordine',
      name: 'ordineAsc',
      by: [{ field: 'ordine', direction: 'asc' }],
    },
  ],
}

export default servizio
