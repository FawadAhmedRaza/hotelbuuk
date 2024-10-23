"use client";
import { Button, HeadingBanner, Pannel, Typography } from "@/src/components";
import { RHFInput, RHFTextArea } from "@/src/components/hook-form";
import { Layout } from "@/src/sections";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider } from "@/src/components/hook-form";
import React from "react";
import { useForm } from "react-hook-form";

const ContactScreen = () => {
  const contactSchema = Yup.object({
    hotel_image: Yup.mixed().optional(),
    hotel_name: Yup.string().required("hotel name is required"),
    description: Yup.string().optional(),
    contact_email: Yup.string().required("contact email is required"),
    hotel_contact_no: Yup.number().required("contact number is required"),
    address: Yup.string().required("address is required"),
    country: Yup.string().required("country is required"),
    city: Yup.string().required("city is required"),
    stars: Yup.mixed().optional().default(4),
    facilites: Yup.array().optional(),
    images: Yup.array(),
  });

  const defaultValues = {};

  const methods = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <Layout>
      <RHFFormProvider methods={methods} onSubmit={onSubmit}>
        <HeadingBanner
          heading="Contact Us"
          text="the printing and typesetting industry. Lorem IpsumIpsum has bee"
          className="bg-about"
        />

        <div className=" flex md:flex-row flex-col gap-10 py-10 px-5 md:px-10">
          <div className=" flex justify-center items-center rounded-md w-full md:w-[40%]">
            <img
              src="/assets/images/forgot-password.png"
              className=" rounded-xl h-[300px] md:h-[450px] w-full lg:w-[80%]  object-center "
            />
          </div>
          <div className=" w-full md:w-[60%]">
            <Typography variant="h1">Contact Us</Typography>
            <div className=" flex flex-col gap-5 mt-10">
              <RHFInput
                name="name"
                label=" Name"
                placeholder="Enter  Your Name"
              />
              <RHFInput
                name="email"
                label=" Email"
                placeholder="Enter  Your Email"
              />
              <RHFInput
                name="phone"
                label=" Phone"
                placeholder="Enter  Your Phone Number"
              />
              <RHFTextArea
                name="message"
                label="Message"
                placeholder="Enter Hotel Message"
              />
            </div>

            <div className=" flex justify-end pt-5">
              <Button >Submit</Button>
            </div>
          </div>
        </div>
      </RHFFormProvider>
    </Layout>
  );
};

export default ContactScreen;
