import { TranslationMessages } from "ra-core";
import { StringMap } from "ra-core/src/i18n/TranslationMessages";

export function mergeMessages(
  appMessages: TranslationMessages,
  messagesFromAddons: Array<StringMap> = []
): TranslationMessages {
  return messagesFromAddons.reduce<TranslationMessages>(
    (acc: TranslationMessages, messages: StringMap) => {
      const merged = {
        resources: {
          ...mergeField("resources", acc, messages),
        },
        enums: {
          ...mergeField("enums", acc, messages),
        },
        routes: {
          ...mergeField("routes", acc, messages),
        },
      };

      return { ...acc, ...messages, ...merged };
    },
    appMessages
  );
}

function mergeField(fieldName: string, obj1: StringMap, obj2: StringMap): StringMap {
  let field: StringMap = {};

  if (typeof obj1[fieldName] === "object") {
    field = { ...(obj1[fieldName] as StringMap) };
  }

  if (typeof obj2[fieldName] === "object") {
    field = { ...field, ...(obj2[fieldName] as StringMap) };
  }
  return field;
}
