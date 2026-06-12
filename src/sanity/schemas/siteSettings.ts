const siteSettings = {
  name: 'siteSettings',
  title: 'Impostazioni sito',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand' },
    { name: 'aspetto', title: 'Aspetto' },
    { name: 'contatti', title: 'Contatti' },
    { name: 'legale', title: 'Dati legali' },
    { name: 'certificazioni', title: 'Certificazioni' },
  ],
  fields: [
    // Brand
    {
      name: 'nome_azienda',
      title: 'Nome azienda',
      type: 'string',
      group: 'brand',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'brand',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Testo alternativo', type: 'string' }],
    },
    {
      name: 'footer_descrizione',
      title: 'Descrizione (footer)',
      type: 'text',
      rows: 3,
      group: 'brand',
    },
    // Aspetto
    {
      name: 'colore_primario',
      title: 'Colore primario (navy)',
      type: 'string',
      group: 'aspetto',
      description: 'Hex del colore principale, es. #1b3a5c',
    },
    {
      name: 'colore_secondario',
      title: 'Colore secondario (teal)',
      type: 'string',
      group: 'aspetto',
      description: 'Hex del colore secondario/accent, es. #2a7f6f',
    },
    {
      name: 'colore_accent',
      title: 'Colore accent',
      type: 'string',
      group: 'aspetto',
      description: 'Hex del colore accent, es. #e8a020',
    },
    {
      name: 'font_principale',
      title: 'Font principale',
      type: 'string',
      group: 'aspetto',
      description: 'Nome esatto del font su Google Fonts',
      options: {
        list: [
          { title: 'Inter (default)', value: 'Inter' },
          { title: 'Montserrat', value: 'Montserrat' },
          { title: 'Lato', value: 'Lato' },
          { title: 'Roboto', value: 'Roboto' },
          { title: 'Open Sans', value: 'Open Sans' },
          { title: 'Raleway', value: 'Raleway' },
          { title: 'Poppins', value: 'Poppins' },
          { title: 'Nunito', value: 'Nunito' },
          { title: 'Source Sans 3', value: 'Source Sans 3' },
        ],
      },
    },
    // Contatti
    { name: 'telefono', title: 'Telefono', type: 'string', group: 'contatti' },
    { name: 'email', title: 'Email', type: 'string', group: 'contatti' },
    { name: 'email_commerciale', title: 'Email commerciale', type: 'string', group: 'contatti' },
    { name: 'reparto', title: 'Reparto (footer)', type: 'string', group: 'contatti' },
    { name: 'indirizzo', title: 'Indirizzo', type: 'string', group: 'contatti' },
    { name: 'citta', title: 'Città (CAP + comune)', type: 'string', group: 'contatti' },
    { name: 'orari', title: 'Orari', type: 'string', group: 'contatti' },
    // Legale
    { name: 'ragione_sociale', title: 'Ragione sociale', type: 'string', group: 'legale' },
    { name: 'piva', title: 'P.IVA', type: 'string', group: 'legale' },
    { name: 'rea', title: 'REA', type: 'string', group: 'legale' },
    { name: 'sede_legale', title: 'Sede legale', type: 'string', group: 'legale' },
    { name: 'email_pec', title: 'Email PEC', type: 'string', group: 'legale' },
    { name: 'copyright', title: 'Testo copyright', type: 'string', group: 'legale' },
    {
      name: 'privacy_policy_url',
      title: 'URL Privacy Policy',
      type: 'url',
      group: 'legale',
    },
    {
      name: 'cookie_policy_url',
      title: 'URL Cookie Policy',
      type: 'url',
      group: 'legale',
    },
    // Certificazioni (condivise tra Chi siamo e Contatti)
    {
      name: 'certificazioni',
      title: 'Certificazioni',
      type: 'array',
      group: 'certificazioni',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'titolo', title: 'Titolo', type: 'string' },
            { name: 'ente', title: 'Ente', type: 'string' },
            { name: 'dal', title: 'Dal (anno)', type: 'string' },
          ],
          preview: { select: { title: 'titolo', subtitle: 'ente' } },
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({ title: 'Impostazioni sito' }),
  },
}

export default siteSettings
