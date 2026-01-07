import { useMutation } from "@tanstack/react-query";
import { api, type InsertBooking } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateBooking() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertBooking) => {
      // Validate data with Zod before sending if needed, but the form handles this usually
      // const validated = api.bookings.create.input.parse(data); 

      const res = await fetch(api.bookings.create.path, {
        method: api.bookings.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        // Handle validation errors specifically if backend returns them
        if (res.status === 400 && errorData.message) {
          throw new Error(errorData.message);
        }
        throw new Error("Failed to submit booking request");
      }

      return api.bookings.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Booking Request Received!",
        description: "An admissions counselor will contact you shortly.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
