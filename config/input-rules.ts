export const defaultRules = [
  (text: string) => !!text || "Please fill in the field.",
];
export const emailRules = [
  (text: string) => !!text || "Email is required",
  (text: string) => /.+@.+/.test(text) || "This is not a valid email",
];

export const passwordRules = [
  (text: string) => !!text || "Password is required",
  (text: string) =>
    text.length >= 8 || "Your password must be at least 8 characters long.",
];

export const passwordConfirmRules = (password: string) => [
  (text: string) => !!text || "Password Confirm is required",
  (text: string) => text === password || "Passwords do not match.",
];
