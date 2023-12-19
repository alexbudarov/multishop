import { NotificationType } from "react-admin";

type NotifyFunction = (
  message: string,
  options?: NotificationOptions & { type?: NotificationType }
) => void;

// todo rename with 'displayServerErrors'. Check is implemented in catch block in screen
// and, not only validation errors now are checked in this method (i.e `INTERNAL_ERROR`)
export const checkServerValidationErrors = (response: any, notify: NotifyFunction) => {
  if (response?.graphQLErrors?.length && response?.graphQLErrors?.length > 0) {
    const errors = response.graphQLErrors as any[];

    if (errors[0]?.extensions?.path?.length && errors[0]?.extensions?.path?.length > 0) {
      const message = errors[0].message;

      const paths: string[] = errors[0].extensions.path;
      // path array could also contain object name (like "input")
      // so, we use the last item of path array as form input field name
      const formInputName: string | undefined = paths.pop();

      if (formInputName != null && formInputName.length > 0) {
        return { [formInputName]: message };
      } else {
        notify(message, { type: "error" });
        return;
      }
    }

    if (errors[0]?.extensions?.classification === "INTERNAL_ERROR") {
      notify("Unexpected internal server error", { type: "error" });
    }

    if (errors[0]?.extensions?.classification === "ValidationError") {
      const message = errors[0].message;
      notify(message, { type: "error" });
    }
  }
};
