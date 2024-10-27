import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { SignInformSchema } from "@/lib/schema";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthProvider";

type SignInFormInputs = z.infer<typeof SignInformSchema>;

export default function SignIn() {
  const { setIsAuthenticated } = useContext(AuthContext);

  /**
   * Form hook to handle the sign in form
   */
  const form = useForm<z.infer<typeof SignInformSchema>>({
    resolver: zodResolver(SignInformSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  /**
   * Handle the form submission and send the form data to the server to sign in the user
   *
   */
  const onSubmit: SubmitHandler<SignInFormInputs> = async (values) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/auth/v1/login`, values);
      if (response.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-200 flex justify-center items-center h-[100vh]">
      <div className="bg-gray-100 min-w-80 px-6 border rounded-lg">
        <h1 className="font-bold text-4xl pt-6 pb-4 text-center">Login</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" type="text" {...field} />
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
                    <Input placeholder="Enter your password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        <div className="pt-4 pb-2 text-sm flex justify-center">
          <div>Don&apos;t have an account?</div>
          <Link className="pointer underline pl-1 cursor-pointer" to="/sign-up">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
