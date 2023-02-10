import { ProfileCard } from "~~/api/dtos/profile_card_dto";

export const useProfileCard = defineStore("card", () => {
  const data = reactive<ProfileCard>({
    title: "Work",
    firstName: "Luis",
    lastName: "de la Cruz",
    jobTitle: "",
    company: "",
  });
  const fullName = computed(() => {
    return data.firstName + " " + data.lastName;
  });
  return {
    data,
    fullName,
  };
});
