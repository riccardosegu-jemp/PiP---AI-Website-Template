const imageField = {
  type: 'image',
  options: { hotspot: true },
  fields: [{ name: 'alt', title: 'Testo alternativo', type: 'string' }],
}

const linkArray = {
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'label', title: 'Etichetta', type: 'string' },
        { name: 'href', title: 'Link', type: 'string' },
      ],
      preview: { select: { title: 'label', subtitle: 'href' } },
    },
  ],
}

const landingProdotto = {
  name: 'landingProdotto',
  title: 'Landing — Lancio prodotto',
  type: 'document',
  groups: [
    { name: 'generale', title: 'Generale / Navbar' },
    { name: 'hero', title: 'Hero' },
    { name: 'claim', title: 'Claim' },
    { name: 'benefici', title: 'Benefici' },
    { name: 'specifiche', title: 'Specifiche' },
    { name: 'faq', title: 'FAQ' },
    { name: 'social', title: 'Social proof' },
    { name: 'cta', title: 'CTA finale + sticky' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    // GENERALE / NAVBAR
    { name: 'nome_prodotto', title: 'Nome prodotto', type: 'string', group: 'generale' },
    { ...imageField, name: 'logo', title: 'Logo', group: 'generale' },
    { ...linkArray, name: 'navbar_links', title: 'Link navbar', group: 'generale' },
    { name: 'navbar_cta_testo', title: 'CTA navbar — testo', type: 'string', group: 'generale' },
    { name: 'navbar_cta_href', title: 'CTA navbar — link', type: 'string', group: 'generale' },
    // HERO
    { name: 'hero_tagline', title: 'Tagline', type: 'text', rows: 3, group: 'hero' },
    { ...imageField, name: 'hero_immagine', title: 'Immagine hero', group: 'hero' },
    {
      name: 'hero_metriche',
      title: 'Metriche',
      type: 'array',
      group: 'hero',
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
    { name: 'hero_cta_primaria_testo', title: 'CTA primaria — testo', type: 'string', group: 'hero' },
    { name: 'hero_cta_primaria_href', title: 'CTA primaria — link', type: 'string', group: 'hero' },
    { name: 'hero_cta_secondaria_testo', title: 'CTA secondaria — testo', type: 'string', group: 'hero' },
    { name: 'hero_cta_secondaria_href', title: 'CTA secondaria — link', type: 'string', group: 'hero' },
    // CLAIM
    { name: 'claim_label', title: 'Label', type: 'string', group: 'claim' },
    { name: 'claim_testo_prima', title: 'Testo', type: 'text', rows: 2, group: 'claim' },
    { name: 'claim_parola_evidenziata', title: 'Parte evidenziata', type: 'string', group: 'claim' },
    { name: 'claim_attribuzione', title: 'Attribuzione', type: 'string', group: 'claim' },
    // BENEFICI
    { name: 'benefici_tagline', title: 'Tagline', type: 'string', group: 'benefici' },
    { name: 'benefici_titolo', title: 'Titolo', type: 'string', group: 'benefici' },
    { name: 'benefici_descrizione', title: 'Descrizione', type: 'text', rows: 2, group: 'benefici' },
    {
      name: 'benefici',
      title: 'Benefici',
      type: 'array',
      group: 'benefici',
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
    // SPECIFICHE
    { name: 'specifiche_tagline', title: 'Tagline', type: 'string', group: 'specifiche' },
    { name: 'specifiche_titolo', title: 'Titolo', type: 'string', group: 'specifiche' },
    { name: 'specifiche_descrizione', title: 'Descrizione', type: 'text', rows: 3, group: 'specifiche' },
    { ...imageField, name: 'specifiche_immagine', title: 'Immagine', group: 'specifiche' },
    {
      name: 'specifiche_voci',
      title: 'Voci tabella',
      type: 'array',
      group: 'specifiche',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'nome', title: 'Nome', type: 'string' },
            { name: 'valore', title: 'Valore', type: 'string' },
          ],
          preview: { select: { title: 'nome', subtitle: 'valore' } },
        },
      ],
    },
    { name: 'specifiche_cta_pdf_testo', title: 'CTA PDF — testo', type: 'string', group: 'specifiche' },
    { name: 'specifiche_cta_pdf_file', title: 'CTA PDF — file', type: 'file', group: 'specifiche' },
    // FAQ
    { name: 'faq_tagline', title: 'Tagline', type: 'string', group: 'faq' },
    { name: 'faq_titolo', title: 'Titolo', type: 'string', group: 'faq' },
    { name: 'faq_descrizione', title: 'Descrizione (l\'email viene da Impostazioni sito)', type: 'text', rows: 2, group: 'faq' },
    {
      name: 'faq',
      title: 'Domande',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'domanda', title: 'Domanda', type: 'string' },
            { name: 'risposta', title: 'Risposta', type: 'text', rows: 4 },
          ],
          preview: { select: { title: 'domanda' } },
        },
      ],
    },
    // SOCIAL PROOF
    { name: 'social_label_loghi', title: 'Label loghi', type: 'string', group: 'social' },
    {
      name: 'social_loghi',
      title: 'Loghi clienti',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Testo alternativo', type: 'string' }],
        },
      ],
    },
    { name: 'recensione_stelle', title: 'Recensione — stelle (1-5)', type: 'number', group: 'social' },
    { name: 'recensione_testo', title: 'Recensione — testo', type: 'text', rows: 3, group: 'social' },
    { name: 'recensione_nome', title: 'Recensione — nome', type: 'string', group: 'social' },
    { name: 'recensione_ruolo', title: 'Recensione — ruolo', type: 'string', group: 'social' },
    { ...imageField, name: 'recensione_foto', title: 'Recensione — foto', group: 'social' },
    // CTA FINALE + STICKY
    { name: 'cta_label', title: 'Label', type: 'string', group: 'cta' },
    { name: 'cta_headline', title: 'Headline', type: 'string', group: 'cta' },
    { name: 'cta_sottotitolo', title: 'Sottotitolo', type: 'text', rows: 2, group: 'cta' },
    { name: 'cta_prezzo', title: 'Prezzo / claim', type: 'string', group: 'cta' },
    { name: 'cta_testo', title: 'CTA — testo', type: 'string', group: 'cta' },
    { name: 'cta_href', title: 'CTA — link', type: 'string', group: 'cta' },
    { name: 'sticky_secondario_testo', title: 'Sticky — secondario testo', type: 'string', group: 'cta' },
    { name: 'sticky_secondario_href', title: 'Sticky — secondario link', type: 'string', group: 'cta' },
    { name: 'sticky_primario_testo', title: 'Sticky — primario testo', type: 'string', group: 'cta' },
    { name: 'sticky_primario_href', title: 'Sticky — primario link', type: 'string', group: 'cta' },
    // FOOTER
    { name: 'footer_nome_azienda', title: 'Nome azienda', type: 'string', group: 'footer' },
    { name: 'footer_piva', title: 'P.IVA', type: 'string', group: 'footer' },
    { name: 'footer_copyright', title: 'Copyright', type: 'string', group: 'footer' },
    { ...linkArray, name: 'footer_links', title: 'Link footer', group: 'footer' },
  ],
  preview: {
    prepare: () => ({ title: 'Landing — Lancio prodotto' }),
  },
}

export default landingProdotto
