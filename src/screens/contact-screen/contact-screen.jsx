"use client";
import { Button, HeadingBanner, Pannel, Typography } from "@/src/components";
import { RHFInput, RHFTextArea } from "@/src/components/hook-form";
import { Layout } from "@/src/sections";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFFormProvider } from "@/src/components/hook-form";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createContact } from "@/src/redux/contact/thunk";

const ContactScreen = () => {
  const dispatch = useDispatch();

  const contactSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone name is required"),
    message: Yup.string().required("Message is required"),
  });

  const methods = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const {
    handleSubmit,
    trigger,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(createContact(data)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      reset();
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

        <div className=" flex md:flex-row flex-col gap-10 py-10 px-5 md:px-10 items-start">
          <div className=" flex justify-center items-center rounded-md w-full md:w-[40%]">
            <img
              src="/assets/images/forgot-password.png"
              className=" rounded-xl h-[300px] md:h-[450px] w-full lg:w-[80%]  object-center "
            />
          </div>
          <div className=" w-full md:w-[60%]  ">
            <Typography variant="h1" className=" text-black ">
              Contact Us
            </Typography>
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
              <Button loading={isSubmitting} type="submit">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </RHFFormProvider>
    </Layout>
  );
};

export default ContactScreen;
