import { TranslationMessages } from "ra-core";
import englishMessages from "ra-language-english";
import { mergeMessages } from "./mergeMessages";

const messages: TranslationMessages = {
  ...englishMessages,
  resources: {},
  amplicode: {
    not_set: "Not set",
  },
};

export const en = mergeMessages(
  messages,
  [] // place addon messages here
);
