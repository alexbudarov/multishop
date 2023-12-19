import { mergeMessages } from "./mergeMessages";

describe("mergeMessages", function () {
  it("should correct merge empty objects", function () {
    // we don't use `TranslationMessages` type here
    // in case of shorter result, which easy to compare
    const appMessages: any = {};
    const addonMessages = {};

    expect(mergeMessages(appMessages, [addonMessages])).toEqual({
      resources: {},
      enums: {},
      routes: {},
    });
  });

  it("should merge resources and enums from app and addon", function () {
    // we don't use `TranslationMessages` type here
    // in case of shorter result, which easy to compare
    const appMessages: any = {
      resources: {
        VisitDTO: {
          name: "Visit |||| Visits",
          fields: {
            description: "Description",
            pet: "Pet",
          },
        },
      },
      enums: {
        ProtectionStatus: {
          NEEDS_PROTECTION: "Needs protection",
          NO_DANGER: "No danger",
          RED_BOOK: "Red book",
        },
      },
      action: {
        confirm: "Confirm",
      },
    };

    const addonMessages = {
      resources: {
        EmailTemplate: {
          name: "Email template |||| Email templates",
          fields: {
            name: "Name",
            code: "Code",
          },
        },
      },
      enums: {
        EmailSendStatus: {
          SENT: "Sent",
          NOT_SENT: "Not sent",
        },
      },
      page: {
        dashboard: "Dashboard",
      },
    };

    expect(mergeMessages(appMessages, [addonMessages])).toEqual({
      resources: {
        VisitDTO: {
          name: "Visit |||| Visits",
          fields: {
            description: "Description",
            pet: "Pet",
          },
        },
        EmailTemplate: {
          name: "Email template |||| Email templates",
          fields: {
            name: "Name",
            code: "Code",
          },
        },
      },
      enums: {
        ProtectionStatus: {
          NEEDS_PROTECTION: "Needs protection",
          NO_DANGER: "No danger",
          RED_BOOK: "Red book",
        },
        EmailSendStatus: {
          SENT: "Sent",
          NOT_SENT: "Not sent",
        },
      },
      routes: {},
      action: {
        confirm: "Confirm",
      },
      page: {
        dashboard: "Dashboard",
      },
    });
  });
});
