module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Tabulous',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Rock+Salt' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Mono' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Muli' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Inconsolata' },
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    },

}
