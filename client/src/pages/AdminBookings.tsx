import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Download, Database } from "lucide-react";
import { motion } from "framer-motion";

type Booking = {
  id: number;
  studentName: string;
  phoneNumber: string;
  studentClass: string;
  city: string;
  createdAt: string;
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/bookings");
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Failed to fetch bookings" }));
        throw new Error(errorData.message || `Failed to fetch bookings (${response.status})`);
      }
      const data = await response.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching bookings";
      setError(errorMessage);
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const exportToCSV = () => {
    const headers = ["ID", "Student Name", "Phone Number", "Class", "City", "Date"];
    const rows = bookings.map((booking) => [
      booking.id,
      booking.studentName,
      booking.phoneNumber,
      booking.studentClass,
      booking.city,
      new Date(booking.createdAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Bookings Admin
              </h1>
              <p className="text-slate-400">
                View all demo booking requests
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={fetchBookings}
                variant="outline"
                disabled={loading}
                className="border-white/10 text-white hover:bg-white/5"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                onClick={exportToCSV}
                variant="outline"
                disabled={bookings.length === 0}
                className="border-white/10 text-white hover:bg-white/5"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6">
            Error: {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
            <p className="text-slate-400">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Database className="h-12 w-12 mx-auto text-slate-500 mb-4" />
                <p className="text-slate-400">No bookings found</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-slate-800 border-slate-700 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white mb-1">{booking.studentName}</CardTitle>
                        <CardDescription className="text-slate-400">
                          Booked: {new Date(booking.createdAt).toLocaleString()}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Phone Number</p>
                        <p className="text-white font-medium">
                          <a href={`tel:${booking.phoneNumber}`} className="hover:text-primary">
                            {booking.phoneNumber}
                          </a>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Current Class</p>
                        <p className="text-white font-medium">{booking.studentClass}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400 mb-1">City</p>
                        <p className="text-white font-medium">{booking.city}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400 mb-1">Booking ID</p>
                        <p className="text-white font-medium">#{booking.id}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-slate-400 text-sm">
          Total Bookings: <span className="text-primary font-bold">{bookings.length}</span>
        </div>
      </section>
    </div>
  );
}
