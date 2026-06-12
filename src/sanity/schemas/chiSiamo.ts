const imageField = {
  type: 'image',
  options: { hotspot: true },
  fields: [{ name: 'alt', title: 'Testo alternativo', type: 'string' }],
}

const chiSiamo = {
  name: 'chiSiamo',
  title: 'Chi siamo',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'storia', title: 'Storia' },
    { name: 'valori', title: 'Valori' },
    { name: 'certificazioni', title: 'Certificazioni' },
    { name: 'team', title: 'Team' },
    { name: 'sede', title: 'Sede' },
    { name: 'contatti', title: 'Contatti' },
  ],
  fields: [
    // HERO
    { name: 'hero_headline', title: 'Headline', type: 'string', group: 'hero' },
    { ...imageField, name: 'hero_immagine', title: 'Immagine hero', group: 'hero' },
    // STORIA
    { name: 'storia_tagline', title: 'Tagline', type: 'string', group: 'storia' },
    { name: 'storia_titolo', title: 'Titolo', type: 'string', group: 'storia' },
    {
      name: 'storia_narrativa',
      title: 'Paragrafi narrativa',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      group: 'storia',
    },
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'array',
      group: 'storia',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'anno', title: 'Anno', type: 'string' },
            { name: 'testo', title: 'Testo', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'anno', subtitle: 'testo' } },
        },
      ],
    },
    // VALORI
    { name: 'valori_tagline', title: 'Tagline', type: 'string', group: 'valori' },
    { name: 'valori_titolo', title: 'Titolo', type: 'string', group: 'valori' },
    { name: 'valori_descrizione', title: 'Descrizione', type: 'text', rows: 2, group: 'valori' },
    {
      name: 'valori',
      title: 'Valori',
      type: 'array',
      group: 'valori',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'numero', title: 'Numero', type: 'number' },
            { name: 'titolo', title: 'Titolo', type: 'string' },
            { name: 'descrizione', title: 'Descrizione', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'titolo', subtitle: 'numero' } },
        },
      ],
    },
    // CERTIFICAZIONI (header — i dati vengono da Impostazioni sito)
    { name: 'cert_tagline', title: 'Tagline', type: 'string', group: 'certificazioni' },
    { name: 'cert_titolo', title: 'Titolo', type: 'string', group: 'certificazioni' },
    // TEAM
    { name: 'team_tagline', title: 'Tagline', type: 'string', group: 'team' },
    { name: 'team_titolo', title: 'Titolo', type: 'string', group: 'team' },
    { name: 'team_descrizione', title: 'Descrizione', type: 'text', rows: 2, group: 'team' },
    {
      name: 'team',
      title: 'Membri del team',
      type: 'array',
      group: 'team',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'nome', title: 'Nome', type: 'string' },
            { name: 'ruolo', title: 'Ruolo', type: 'string' },
            { name: 'bio', title: 'Bio', type: 'text', rows: 3 },
            { ...imageField, name: 'foto', title: 'Foto' },
          ],
          preview: { select: { title: 'nome', subtitle: 'ruolo', media: 'foto' } },
        },
      ],
    },
    // SEDE
    { name: 'sede_tagline', title: 'Tagline', type: 'string', group: 'sede' },
    { name: 'sede_titolo', title: 'Titolo', type: 'string', group: 'sede' },
    { name: 'sede_descrizione', title: 'Descrizione', type: 'text', rows: 3, group: 'sede' },
    {
      name: 'sede_punti',
      title: 'Punti elenco sede',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'sede',
    },
    { ...imageField, name: 'sede_immagine', title: 'Immagine sede', group: 'sede' },
    // CONTATTI
    { name: 'contatti_tagline', title: 'Tagline', type: 'string', group: 'contatti' },
    { name: 'contatti_titolo', title: 'Titolo', type: 'string', group: 'contatti' },
    { name: 'contatti_descrizione', title: 'Descrizione', type: 'text', rows: 2, group: 'contatti' },
  ],
  preview: {
    prepare: () => ({ title: 'Chi siamo' }),
  },
}

export default chiSiamo
