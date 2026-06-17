// Singleton per i metadati della pagina /case-study.
// Le card dei casi vengono dai documenti "caseStudy"; qui c'è solo il SEO
// (ed eventuali futuri campi di intestazione pagina).
const caseStudyPage = {
  name: 'caseStudyPage',
  title: 'Pagina case study',
  type: 'document',
  fields: [
    { name: 'seo', title: 'SEO', type: 'seo' },
  ],
  preview: {
    prepare: () => ({ title: 'Pagina case study' }),
  },
}

export default caseStudyPage
