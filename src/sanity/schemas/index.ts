import servizio from './servizio'
import caseStudy from './caseStudy'
import siteSettings from './siteSettings'
import homepage from './homepage'
import chiSiamo from './chiSiamo'
import contattiPage from './contattiPage'
import landingProdotto from './landingProdotto'
import seo from './seo'
import serviziPage from './serviziPage'
import caseStudyPage from './caseStudyPage'

export const schemaTypes = [
  seo, // oggetto riusabile: va registrato prima degli schema che lo usano
  siteSettings,
  homepage,
  chiSiamo,
  contattiPage,
  serviziPage,
  caseStudyPage,
  landingProdotto,
  servizio,
  caseStudy,
]
