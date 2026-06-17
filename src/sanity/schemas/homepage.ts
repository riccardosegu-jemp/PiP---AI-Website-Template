const imageField = {
  name: 'immagine',
  title: 'Immagine',
  type: 'image',
  options: { hotspot: true },
  fields: [{ name: 'alt', title: 'Testo alternativo', type: 'string' }],
}

const homepage = {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'trustbar', title: 'Trust bar' },
    { name: 'servizi', title: 'Servizi' },
    { name: 'processo', title: 'Processo' },
    { name: 'casi', title: 'Case study' },
    { name: 'perche', title: 'Perché sceglierci' },
    { name: 'contatti', title: 'Contatti' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // HERO
    { name: 'hero_headline', title: 'Headline', type: 'string', group: 'hero' },
    { name: 'hero_sottotitolo', title: 'Sottotitolo', type: 'text', rows: 3, group: 'hero' },
    { name: 'hero_cta_primaria_testo', title: 'CTA primaria — testo', type: 'string', group: 'hero' },
    { name: 'hero_cta_primaria_href', title: 'CTA primaria — link', type: 'string', group: 'hero' },
    { name: 'hero_cta_secondaria_testo', title: 'CTA secondaria — testo', type: 'string', group: 'hero' },
    { name: 'hero_cta_secondaria_href', title: 'CTA secondaria — link', type: 'string', group: 'hero' },
    { ...imageField, name: 'hero_immagine', title: 'Immagine hero', group: 'hero' },
    // TRUST BAR
    { name: 'trustbar_titolo', title: 'Titolo trust bar', type: 'string', group: 'trustbar' },
    {
      name: 'loghi_clienti',
      title: 'Loghi clienti',
      type: 'array',
      group: 'trustbar',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Testo alternativo', type: 'string' }],
        },
      ],
    },
    // SERVIZI (header — le card vengono dai documenti "servizio")
    { name: 'servizi_tagline', title: 'Tagline', type: 'string', group: 'servizi' },
    { name: 'servizi_titolo', title: 'Titolo', type: 'string', group: 'servizi' },
    { name: 'servizi_descrizione', title: 'Descrizione', type: 'text', rows: 2, group: 'servizi' },
    // PROCESSO
    { name: 'processo_tagline', title: 'Tagline', type: 'string', group: 'processo' },
    { name: 'processo_titolo', title: 'Titolo', type: 'string', group: 'processo' },
    { name: 'processo_descrizione', title: 'Descrizione', type: 'text', rows: 2, group: 'processo' },
    {
      name: 'processo',
      title: 'Step del processo',
      type: 'array',
      group: 'processo',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'numero', title: 'Numero', type: 'number' },
            {
              name: 'icona',
              title: 'Icona',
              type: 'string',
              options: {
                list: [
                  { title: 'Messaggio', value: 'message-square' },
                  { title: 'Graffetta', value: 'paperclip' },
                  { title: 'Chiave', value: 'wrench' },
                  { title: 'Check', value: 'check-circle-2' },
                  { title: 'Camion', value: 'truck' },
                ],
              },
            },
            { name: 'titolo', title: 'Titolo', type: 'string' },
            { name: 'descrizione', title: 'Descrizione', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'titolo', subtitle: 'numero' } },
        },
      ],
    },
    // CASE STUDY (header — le card vengono dai documenti "caseStudy")
    { name: 'casi_tagline', title: 'Tagline', type: 'string', group: 'casi' },
    { name: 'casi_titolo', title: 'Titolo', type: 'string', group: 'casi' },
    { name: 'casi_descrizione', title: 'Descrizione', type: 'text', rows: 2, group: 'casi' },
    // PERCHÉ SCEGLIERCI
    { name: 'perche_tagline', title: 'Tagline', type: 'string', group: 'perche' },
    { name: 'perche_titolo', title: 'Titolo', type: 'string', group: 'perche' },
    { name: 'perche_descrizione', title: 'Descrizione', type: 'text', rows: 2, group: 'perche' },
    {
      name: 'features',
      title: 'Punti di forza',
      type: 'array',
      group: 'perche',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icona',
              title: 'Icona',
              type: 'string',
              options: {
                list: [
                  { title: 'Target', value: 'target' },
                  { title: 'Utente', value: 'user' },
                  { title: 'Check', value: 'check-circle-2' },
                  { title: 'Refresh', value: 'refresh-cw' },
                ],
              },
            },
            { name: 'titolo', title: 'Titolo', type: 'string' },
            { name: 'descrizione', title: 'Descrizione', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'titolo' } },
        },
      ],
    },
    {
      name: 'stats',
      title: 'Statistiche',
      type: 'array',
      group: 'perche',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'valore', title: 'Valore', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'descrizione', title: 'Descrizione', type: 'string' },
          ],
          preview: { select: { title: 'valore', subtitle: 'label' } },
        },
      ],
    },
    // CONTATTI
    { name: 'contatti_tagline', title: 'Tagline', type: 'string', group: 'contatti' },
    { name: 'contatti_titolo', title: 'Titolo', type: 'string', group: 'contatti' },
    { name: 'contatti_descrizione', title: 'Descrizione', type: 'text', rows: 2, group: 'contatti' },
    // SEO
    { name: 'seo', title: 'SEO', type: 'seo', group: 'seo' },
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
}

export default homepage
