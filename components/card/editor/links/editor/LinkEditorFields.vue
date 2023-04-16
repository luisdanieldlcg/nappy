<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-select
          v-model="country"
          class="pt-4"
          density="compact"
          label="Country"
          item-title="countryName"
          item-value="countryCode"
          :items="countries"
          return-object
        >
        </v-select>
      </v-col>
      <v-col cols="8">
        <v-text-field variant="underlined" label="Title" />
      </v-col>
    </v-row>

    <TextField
      density="compact"
      v-model="editor.linkPreview.subtitle"
      variant="underlined"
      label="Label"
      hint="This is optional, but it helps you remember what this link is for."
    >
      <!-- <template #details v-if="canHandleURL">
        <Icon name="ph:link-simple-bold" size="15" class="mr-2" />
        <nuxt-link
          :to="httpLinks[linkPreview.type].url + linkPreview.title"
          target="_blank"
          class="font-italic text-grey-darken-3"
        >
          {{ httpLinks[linkPreview.type].url + linkPreview.title }}
        </nuxt-link>
      </template> -->
    </TextField>
  </div>
</template>

<script setup lang="ts">
import { CardLink } from "~~/api/dtos/card.dto";
import { allCountries } from "country-telephone-data";
const country = ref(undefined);
const editor = useLinkEditorStore();
const { linkPreview } = storeToRefs(editor);

// Map countries to v-select items
// When using objects for the items prop, you must associate item-title and item-value with existing properties on your objects.
// These values are defaulted to title and value and can be changed.
const countries = computed(() => {
  return allCountries.map((country) => {
    return {
      countryName: country.name,
      countryCode: country.iso2,
    };
  });
});

// This array contains the links that do not handle an URL
const noURL: CardLink[] = ["phone", "email", "whatsapp"];
const canHandleURL = computed(() => {
  return !noURL.includes(editor.linkPreview.type);
});
</script>
