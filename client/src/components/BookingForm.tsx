import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { useCreateBooking } from "@/hooks/use-bookings";
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
import { Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";

export function BookingForm() {
  const { mutate, isPending } = useCreateBooking();

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      studentName: "",
      phoneNumber: "",
      studentClass: "",
      city: "",
    },
  });

  function onSubmit(data: InsertBooking) {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        // Auto-open WhatsApp after successful submission
        const message = `Hello LeapStart Team,%0A%0AI have submitted the demo form.%0AName: ${data.studentName}%0APhone: ${data.phoneNumber}%0AClass: ${data.studentClass}%0ACity: ${data.city}`;
        window.open(`https://wa.me/91YOURNUMBERHERE?text=${message}`, "_blank");
      },
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Start Without Pressure
        </h3>
        <p className="text-slate-600">
          Book a free demo session to understand how we turn students into top 1% engineers.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">Student Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter student's full name" 
                    className="bg-slate-50 border-slate-200 text-slate-900 focus:border-primary focus:ring-primary/20"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="+91 98765 43210" 
                    className="bg-slate-50 border-slate-200 text-slate-900 focus:border-primary focus:ring-primary/20"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="studentClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700">Current Class</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. 12th" 
                      className="bg-slate-50 border-slate-200 text-slate-900 focus:border-primary focus:ring-primary/20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700">City</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g. Bangalore" 
                      className="bg-slate-50 border-slate-200 text-slate-900 focus:border-primary focus:ring-primary/20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Book Free Demo
                <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
              Or connect instantly
            </span>
            <button
              type="button"
              onClick={() => {
                const data = form.getValues();
                const message = `Hello LeapStart Team,%0A%0AI am interested in the 4-Year Engineering Program.%0AName: ${data.studentName || "Interested Student"}%0APhone: ${data.phoneNumber || "N/A"}%0ACity: ${data.city || "N/A"}`;
                window.open(`https://wa.me/91YOURNUMBERHERE?text=${message}`, "_blank");
              }}
              className="mt-3 w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-500" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp
            </button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
