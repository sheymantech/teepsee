export default {
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  css: ["~/assets/css/global.css"],
  vite: {
    assetsInclude: ["**/*.svg", "**/*.png"],
  },

  runtimeConfig: {
    public: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    },
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  },

  plugins: [{ src: "~/plugins/supabase.js", mode: "client" }],
};
