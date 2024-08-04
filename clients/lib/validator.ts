export const validator: Record<string, (value: string) => string | null> = {
    email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    password: (value) =>
      value.length < 6 ? "Password must have at least 6 characters" : null,
    phone: (value) =>
      value.length < 10
        ? "Phone number must have at least 10 characters"
        : null,
}