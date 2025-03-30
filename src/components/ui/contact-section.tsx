
"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Namn måste anges"
  }),
  email: z.string().min(1, {
    message: "E-postadress måste anges"
  }).email({
    message: "Ogiltig e-postadress"
  }),
  phone: z.string().optional(),
  company: z.string().min(1, {
    message: "Företag måste anges"
  }),
  message: z.string().min(1, {
    message: "Meddelande måste anges"
  })
});

type ContactFormValues = z.infer<typeof formSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    toast.success("Ditt meddelande har skickats!");
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 md:py-[50px] w-full">
      <div className="w-full md:container md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                Kontakta oss
              </h2>
              <p className="text-lg text-muted-foreground">
                Vi hjälper gärna ditt företag att optimera verksamheten med smarta AI-lösningar. 
                Kontakta oss för att diskutera hur vi kan stödja just era behov.
              </p>
            </div>

            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <p>info@prata.ai</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <p>+1 (800) 123 4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <p>sales@prata.ai</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="relative w-full h-[220px] overflow-hidden rounded-lg flex items-center justify-center">
                <img alt="Kundsupport" className="w-auto h-full object-contain max-w-full" src="/lovable-uploads/7eb5e938-cfac-4fb9-9a83-90d78c000899.png" />
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name and Company fields side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({
                  field
                }) => <FormItem>
                          <FormLabel>Namn<span className="text-inherit">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Anders Andersson" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  
                  <FormField control={form.control} name="company" render={({
                  field
                }) => <FormItem>
                          <FormLabel>Företag<span className="text-inherit">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="Volvo AB" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                </div>
                
                {/* Email and Phone fields side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="email" render={({
                  field
                }) => <FormItem>
                          <FormLabel>E-postadress<span className="text-inherit">*</span></FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="anders@företag.se" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  
                  <FormField control={form.control} name="phone" render={({
                  field
                }) => <FormItem>
                          <FormLabel>Telefonnummer</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="070-123 45 67" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                </div>
                
                <FormField control={form.control} name="message" render={({
                field
              }) => <FormItem>
                      <FormLabel>Meddelande<span className="text-inherit">*</span></FormLabel>
                      <FormControl>
                        <Textarea placeholder="Skriv ditt meddelande här" className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Skickar..." : "Skicka"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
