import {message} from "antd";

export function showErrors(error, form = null) {
  if (error.non_field_errors || error.error)
    message.error(error.non_field_errors || error.error);
  else {
    Object.keys(error).forEach(function (key) {
      if (form)
        form.setFields({
          [key]: {
            errors: [new Error(error[key])],
          }
        });
    });
  }
}
