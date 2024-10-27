import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpFormSchema } from "@/lib/schema";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type SignUpFormInputs = z.infer<typeof SignUpFormSchema>;

export default function SignUp() {
  const navigate = useNavigate();

  // Form hook to handle sign-up form
  const form = useForm<SignUpFormInputs>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    },
  });

  // Handle the form submission
  const onSubmit: SubmitHandler<SignUpFormInputs> = async (values) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/auth/v1/register`, values);

      if (response.status == 200) {
        toast.success("Registered successfully!");
        navigate("/sign-in");
      } else {
        toast.error(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        // Handle specific error messages
        toast.error(error.response.data.message || "Registration failed. Please try again.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center h-[93vh]">
      <div className="bg-gray-100 min-w-80 px-6 border rounded-lg">
        <h1 className="font-bold text-4xl pt-6 pb-4 text-center">Sign up</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>
        </Form>
        <div className="pt-4 pb-2 text-sm flex justify-center">
          <div>Already have an account?</div>
          <Link className="pointer underline pl-1 cursor-pointer" to="/sign-in">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
