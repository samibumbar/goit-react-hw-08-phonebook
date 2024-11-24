import * as Yup from "yup";

export const contactFormSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Z]+(([ -][a-zA-Z])?[a-zA-Z]*)*$/,
      "Name may contain only letters, dashes, and spaces."
    )
    .required("Name is required"),
  number: Yup.string()
    .matches(
      /^\+?[0-9]{1,4}?[-.\s]?\(?[0-9]{1,3}?\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/,
      "Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +"
    )
    .required("Phone number is required"),
});
