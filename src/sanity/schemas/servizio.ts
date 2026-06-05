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
      fields: [
        {
          name: 'alt',
          title: 'Testo alternativo',
          type: 'string',
        },
      ],
    },
    {
      name: 'ordine',
      title: 'Ordine di visualizzazione',
      type: 'number',
    },
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
