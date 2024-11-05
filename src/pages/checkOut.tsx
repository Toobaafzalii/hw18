import React from "react";
import { useForm, UseFormHandleSubmit } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  address: string;
  city: string;
  code: string;
  cardNumber: string;
  cardCvv: string;
}

export const CheckOut: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    reValidateMode: "onChange",
    shouldUseNativeValidation: false,
    values: {
      name: "",
      email: "",
      address: "",
      city: "",
      code: "",
      cardNumber: "",
      cardCvv: "",
    },
  });
  const handleSubmitForm = (data: FormValues) => {
    console.log(data);
    // event.preventDefault();
    // console.log(event);
    // event.target.children.map((input) => {
    //   console.log(input.value);
    // });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="container mx-auto py-10 px-80 "
      >
        <div className="w-full mx-auto flex flex-col justify-start items-start gap-5">
          <div className="flex flex-col">
            {" "}
            <div className="flex justify-between items-center w-96">
              <label htmlFor="name" className="min-w-40">
                Name:{" "}
              </label>
              <input
                type="text"
                id="name"
                className="border-2 border-gray-400 rounded-md w-96"
                {...register("name", { required: true })}
              />
            </div>
            {errors.name && <p className="text-red-600">Name is required</p>}
          </div>
          <div className="flex justify-between items-center w-96">
            <label htmlFor="email" className="min-w-40">
              Email:{" "}
            </label>
            <input
              type="email"
              id="email"
              className="border-2 border-gray-400 rounded-md w-96"
              {...register("email", {
                required: true,
                pattern: /\S+@\S+\.\S+/,
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-600">Invalid email address</p>
          )}

          <div className="flex justify-between items-center w-96">
            <label htmlFor="address" className="min-w-40">
              Address:{" "}
            </label>
            <input
              type="text"
              id="address"
              className="border-2 border-gray-400 rounded-md w-96"
              {...register("address", { required: true })}
            />
          </div>
          {errors.address && (
            <p className="text-red-600">Address is required</p>
          )}

          <div className="flex justify-between items-center w-96">
            <label htmlFor="city" className="min-w-40">
              City:{" "}
            </label>
            <input
              type="text"
              id="city"
              className="border-2 border-gray-400 rounded-md w-96"
              {...register("city", { required: true })}
            />
          </div>
          {errors.city && <p className="text-red-600">City is required</p>}

          <div className="flex justify-between items-center w-96">
            <label htmlFor="code" className="min-w-40">
              Postal Code:{" "}
            </label>
            <input
              type="text"
              id="code"
              className="border-2 border-gray-400 rounded-md w-96"
              {...register("code", { required: true })}
            />
          </div>
          {errors.code && (
            <p className="text-red-600">Postal Code is required</p>
          )}

          <div className="flex justify-between items-center w-96">
            <label htmlFor="cardNumber" className="min-w-40">
              Card Number:{" "}
            </label>
            <input
              type="text"
              id="cardNumber"
              className="border-2 border-gray-400 rounded-md w-96"
              {...register("cardNumber", {
                required: true,
                pattern: /^\d{16}$/,
              })}
            />
          </div>
          {errors.cardNumber && (
            <p className="text-red-600">Invalid card number</p>
          )}

          <div className="flex justify-between items-center w-96">
            <label htmlFor="cardCvv" className="min-w-40">
              CVV:{" "}
            </label>
            <input
              type="text"
              id="cardCvv"
              className="border-2 border-gray-400 rounded-md w-96"
              {...register("cardCvv", {
                required: true,
                minLength: 3,
                maxLength: 3,
              })}
            />
          </div>
          {errors.cardCvv && <p className="text-red-600">Invalid CVV</p>}

          <button type="submit" className="min-w-[60%] bg-blue-500 p-2">
            Checkout
          </button>
        </div>
      </form>
    </div>
  );
};
