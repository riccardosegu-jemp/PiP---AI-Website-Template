const caseStudy = {
  name: 'caseStudy',
  title: 'Case Study',
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
      name: 'settore',
      title: 'Settore / Cliente',
      type: 'string',
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
      name: 'metriche',
      title: 'Metriche risultato',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'valore', title: 'Valore', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
          preview: { select: { title: 'valore', subtitle: 'label' } },
        },
      ],
    },
    {
      name: 'descrizione_breve',
      title: 'Descrizione breve',
      type: 'text',
      rows: 2,
    },
    {
      name: 'descrizione_completa',
      title: 'Descrizione completa',
      type: 'text',
      rows: 5,
    },
    {
      name: 'in_evidenza',
      title: 'In evidenza',
      type: 'boolean',
      description: 'Mostra questo caso in grande nella sezione principale della pagina',
      initialValue: false,
    },
    {
      name: 'ordine',
      title: 'Ordine di visualizzazione',
      type: 'number',
    },
  ],
  orderings: [
    {
      title: 'In evidenza, poi ordine',
      name: 'evidenzaOrdine',
      by: [
        { field: 'in_evidenza', direction: 'desc' },
        { field: 'ordine', direction: 'asc' },
      ],
    },
  ],
}

export default caseStudy
