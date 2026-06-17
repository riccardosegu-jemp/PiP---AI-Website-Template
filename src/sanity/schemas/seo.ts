// Oggetto SEO riusabile: incluso in ogni pagina per personalizzare title e
// description nei risultati Google. Se i campi restano vuoti, le pagine usano
// i default ottimizzati definiti in src/lib/seo.ts.
const seo = {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    {
      name: 'meta_title',
      title: 'Meta title',
      type: 'string',
      description: 'Titolo nei risultati Google. Consigliato max ~60 caratteri. Se vuoto, usa il default del codice.',
      validation: (Rule: { max: (n: number) => unknown }) => Rule.max(70),
    },
    {
      name: 'meta_description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Descrizione nei risultati Google. Ideale 140-160 caratteri. Se vuoto, usa il default del codice.',
      validation: (Rule: { max: (n: number) => unknown }) => Rule.max(180),
    },
  ],
}

export default seo
