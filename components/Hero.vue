<template>
  <div
    class="py-4 px-6 md:px-10 h-[400px] sm:h-[500px] lg:h-[700px] bg-heroImg bg-cover bg-center bg-no-repeat"
  >
    <HeroHeader />
    <div class="w-full h-full flex justify-start items-center text-white">
      <div class="tracking-wide z-10">
        <h1 class="sm:text-6xl text-4xl font-semibold">Get Teepsee</h1>
        <p class="font-normal mt-2 md:mt-4 text-md">
          Wine,Liquor,ice,Mixers and some other cool stuff? We got it.
        </p>
        <NuxtLink to="/categories/all">
          <button
            class="bg-white border-none py-2 px-8 text-black rounded-lg mt-4 md:mt-5 font-semibold"
          >
            Get Started
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
