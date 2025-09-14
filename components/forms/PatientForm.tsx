"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import { SubmitButton } from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  SELECT = "select",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phone_input",
  DATE_PICKER = "date_picker",
  SKELETON = "skeleton",
}

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
      console.log(newUser);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your appointments.</p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="Mohamed..."
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="mohamed@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone Number"
          placeholder="phone number"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
