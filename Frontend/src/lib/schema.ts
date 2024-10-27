import { z } from "zod";

/**
 * Sign up Form schema
 */
export const SignUpFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First Name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last Name is required.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 8 characters.",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter.",
  })
  .regex(/[0-9]/, {
    message: "Password must contain at least one number.",
  })
  .regex(/[@$!%*?&#]/, {
    message: "Password must contain at least one special character.",
  }),
});

/**
 * Sign In Form schema
 */
export const SignInformSchema = z.object({
  username: z.string().min(1, {
    message: "Invalid username address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 8 characters.",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter.",
  })
  .regex(/[0-9]/, {
    message: "Password must contain at least one number.",
  })
  .regex(/[@$!%*?&#]/, {
    message: "Password must contain at least one special character.",
  }),
});
