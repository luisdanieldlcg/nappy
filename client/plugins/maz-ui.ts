import "maz-ui/css/main.css";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("MazPhoneNumberInput", MazPhoneNumberInput);
});
