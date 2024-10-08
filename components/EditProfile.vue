<script setup>
import unknownUser from "~/assets/unknownUser.png";
import edit from "~/assets/edit.png";

import { useAuthStore } from "~/stores/auth.js";

const authStore = useAuthStore();

const fullName = ref(authStore.user?.user_metadata.fullName || "");
const address = ref(authStore.user?.user_metadata.address || "");
const email = ref(authStore.user?.email || "");

const { $toast } = useNuxtApp();

const handleEditProfile = async () => {
  await authStore.updateProfile({
    fullName: fullName.value,
    email: email.value,
    address: address.value,
  });

  if (!authStore.error) {
    $toast.success("profile updated successfully!");
  } else {
    $toast.error("please try again, failed to update profile");
  }
};

onMounted(async () => {
  await authStore.getAvatarUrl();
});

const avatar_url = computed(() => authStore.avatar_url);

const handleAvatarChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await authStore.uploadAvatar(file);
    if (!authStore.error) {
      $toast.success("Avatar updated successfully!");
      avatarUrl.value = await authStore.getAvatarUrl();
    } else {
      $toast.error("Failed to update avatar, please try again.");
    }
  }
};

function handleFileInput() {
  document.getElementById("avatar-input").click();
}
</script>

<template>
  <div
    class="py-12 px-6 rounded-lg bg-white w-full text-secondary tracking-wide"
  >
    <h1 class="text-2xl font-semibold">Profile</h1>

    <div class="flex gap-x-8 justify-start items-center">
      <div class="mt-5 relative w-[80px]">
        <img
          :src="avatar_url || unknownUser"
          class="w-[80px] rounded-full"
          alt=""
        />
        <input
          type="file"
          accept="image/*"
          id="avatar-input"
          class="hidden"
          @change="handleAvatarChange"
        />

        <img
          v-if="!avatar_url"
          class="w-[25px] absolute bottom-2 right-[-8%] cursor-pointer"
          :src="edit"
          alt=""
          @click="handleFileInput"
        />
      </div>
      <div>
        <h1 class="text-xl">{{ authStore.user.user_metadata.fullName }}</h1>
        <p class="text-sm text-primary">Teepseer</p>
      </div>
    </div>
    <form
      @submit.prevent="handleEditProfile"
      class="flex flex-wrap w-full justify-start items-start gap-x-5 flex-col"
    >
      <div class="sm:w-[45%] w-full">
        <div>
          <label class="font-semibold block mt-5">Full Name</label>
          <input
            type="text"
            v-model="fullName"
            class="px-4 py-2 rounded-lg bg-[#e6e3e3] w-full mt-1 outline-none"
          />
        </div>
        <div>
          <label class="font-semibold block mt-5">address</label>
          <input
            required
            v-model="address"
            class="px-4 py-2 rounded-lg bg-[#e6e3e3] w-full mt-1 outline-none"
            type="text"
          />
        </div>
      </div>

      <button
        type="submit"
        class="w-full text-center text-white bg-secondary rounded-md py-4 mt-6 md:w-[50%]"
      >
        {{ authStore.loading ? "updating....." : "Edit Profile" }}
      </button>
    </form>
  </div>
</template>
