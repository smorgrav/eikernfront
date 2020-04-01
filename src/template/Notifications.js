/**
 * The concept of pop up notifications on web applications have many names e.g; toast and snackbar.
 * Semantic-ui has a message component that might become the same (some discussions in github issues about that).
 *
 * I'm anticipating that the underlying technology will change, so this component is
 * to encapsulate the current technology (react-toastify), apply defaults and styling.
 */
import { toast } from "react-toastify";
import "src/template/notifications.css";

// See https://www.npmjs.com/package/react-toastify#api
toast.configure({
  autoClose: 8000,
  draggable: true,
  position: toast.POSITION.BOTTOM_RIGHT,
});

const infoMessage = (message) => {
  toast.info(message);
};

const warningMessage = (message) => {
  toast.warn(message);
};

const errorMessage = (message) => {
  const refined =
    typeof message === "string" ? message : JSON.stringify(message);
  toast.error(refined);
};

const successMessage = (message) => {
  toast.success(message);
};

const restMessage = (response, prefix, code = 200) => {
  // Gracefully handle various types of rest responses input
  // Response can be a raw fetch request, an already decoded object or a plain string
  if (typeof response === "object") {
    if (typeof response.text === "function") {
      Promise.resolve(response.text()).then((text) => {
        restMessageInner(code, text, prefix);
      });
    } else {
      restMessageInner(
        response.code || 200,
        response.message || JSON.stringify(response),
        prefix
      );
    }
  } else if (typeof response === "string") {
    restMessageInner(code, response, prefix);
  }
};

const restMessageInner = (code, message, prefix) => {
  console.log("Got message: %o", message);

  // Trunk long messages
  if (message.length > 200) {
    message = message.substring(0, 200);
  }

  // Add pre-message if given
  // Most of the time the message is just "Success" - so you would like
  // to prefix it with eg. 'Adding user: '
  message = prefix ? prefix + message : message;

  if (code < 300) {
    successMessage(message);
  } else if (code < 400) {
    infoMessage(message);
  } else {
    errorMessage(message);
  }
};

export {
  infoMessage,
  warningMessage,
  errorMessage,
  successMessage,
  restMessage,
};
