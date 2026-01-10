import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

const testDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  collegeName: z.string().min(2, "College name is required"),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
});

type TestDetailsFormData = z.infer<typeof testDetailsSchema>;

export default function TestDetailsForm() {
  const [, setLocation] = useLocation();

  const form = useForm<TestDetailsFormData>({
    resolver: zodResolver(testDetailsSchema),
    defaultValues: {
      name: "",
      parentName: "",
      collegeName: "",
      mobileNumber: "",
      email: "",
    },
  });

  async function onSubmit(data: TestDetailsFormData) {
    try {
      // Check email and create user
      const response = await fetch("/api/users/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Failed to verify email" }));
        
        if (response.status === 409) {
          // Email already exists
          form.setError("email", {
            type: "manual",
            message: errorData.message || "Test has already been recorded. Please use another email.",
          });
          throw new Error(errorData.message || "Test has already been recorded. Please use another email.");
        }
        
        throw new Error(errorData.message || "Failed to verify email");
      }

      const user = await response.json();
      
      // Store user ID and original form data in sessionStorage
      sessionStorage.setItem("testDetails", JSON.stringify(data));
      sessionStorage.setItem("userId", user.id.toString());
      
      // Navigate to test page
      setLocation("/test");
    } catch (error) {
      console.error("Error checking email:", error);
      form.setError("root", {
        type: "manual",
        message: error instanceof Error ? error.message : "An error occurred. Please try again.",
      });
      throw error; // Re-throw to prevent form submission
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                Enter Your Details
              </h1>
              <p className="text-slate-600">
                Please fill in your information to proceed with the test
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Your Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your full name" 
                          className="bg-slate-50 border-slate-200 text-slate-900 focus:border-primary focus:ring-primary/20 h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="parentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Parent Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter parent's full name" 
                          className="bg-slate-50 border-slate-200 text-slate-900 focus:border-primary focus:ring-primary/20 h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="collegeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">College Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your college name" 
                          className="bg-slate-50 border-slate-200 text-slate-900 focus:border-primary focus:ring-primary/20 h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Mobile Number *</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel"
                          placeholder="9876543210" 
                          className="bg-slate-50 border-slate-200 text-slate-900 focus:border-primary focus:ring-primary/20 h-12"
                          {...field} 
                        />
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
                      <FormLabel className="text-slate-700">Email Address *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="your.email@example.com" 
                          className="bg-slate-50 border-slate-200 text-slate-900 focus:border-primary focus:ring-primary/20 h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.formState.errors.root && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {form.formState.errors.root.message}
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Verifying email...
                    </>
                  ) : (
                    <>
                      Proceed to Test
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
