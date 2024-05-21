import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormContainer from "./FormContainer";
import FormTitle from "./FormTitle";
import FormField from "./FormField";
import FormLabel from "./FormLabel";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextArea from "./FormTextArea";
import FormErrorMessage from "./FormErrorMessage";
import FormWrapper from "./FormWrapper";
import SubmitButton from "./SubmitButton";

const data = [
  { id: 0, value: "Заявка" },
  { id: 1, value: "Предложение" },
];

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const [totalAmount, setTotalAmount] = useState(0);
  const [accreditationChecked, setAccreditationChecked] = useState(false);

  const onSubmit = (data) => {
    const amount = parseFloat(data.amount.replace(/\s/g, ""));
    const finalAmount = accreditationChecked ? amount * 1.2 : amount;
    setTotalAmount(finalAmount.toFixed(2));
  };

  const formatNumber = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    if (!isNaN(value) && value.length <= 6) {
      const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      setValue("amount", formattedValue);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Заполните форму</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <FormLabel error={errors.fullName}>ФИО</FormLabel>
          <FormInput
            type="text"
            {...register("fullName", {
              required: true,
              minLength: 10,
              maxLength: 30,
            })}
            maxLength={30}
            placeholder="Заполнить"
          />
          {errors.fullName && (
            <FormErrorMessage>
              ФИО должно быть от 10 до 30 символов
            </FormErrorMessage>
          )}
        </FormField>

        <FormField>
          <FormLabel error={errors.rating}>Рейтинг</FormLabel>
          <FormInput
            type="number"
            {...register("rating", {
              required: true,
              min: 1,
              max: 100,
            })}
            placeholder="Введите значение от 1 до 100"
          />
          {errors.rating && (
            <FormErrorMessage>Рейтинг должен быть от 1 до 100</FormErrorMessage>
          )}
        </FormField>

        <FormField>
          <FormWrapper>
            <FormInput
              type="checkbox"
              {...register("accreditation")}
              style={{ width: 15, cursor: "pointer" }}
              checked={accreditationChecked}
              onChange={(e) => setAccreditationChecked(e.target.checked)}
            />
            <FormLabel
              style={{
                marginBottom: 0,
                color: accreditationChecked ? "rgba(34, 139, 98, 1)" : "",
              }}
            >
              Имеется аккредитация
            </FormLabel>
          </FormWrapper>
        </FormField>

        <FormField>
          <FormLabel error={errors.amount}>Желаемая сумма, рубли</FormLabel>
          <FormInput
            type="text"
            {...register("amount", {
              required: true,
              pattern: /^\d{1,6}(\.\d{0,2})?$/,
            })}
            onChange={formatNumber}
            placeholder="0"
          />
          {errors.amount && (
            <FormErrorMessage>
              Сумма должна быть до 6 знаков перед точкой и до 2 знаков после
              точки
            </FormErrorMessage>
          )}
        </FormField>

        <FormField>
          <FormLabel error={errors.category}>Категория</FormLabel>
          <FormSelect {...register("category", { required: true })}>
            {data.map((item) => (
              <option key={item.id} value={item.value}>
                {item.value}
              </option>
            ))}
          </FormSelect>
          {errors.category && (
            <FormErrorMessage>Пожалуйста, выберите категорию</FormErrorMessage>
          )}
        </FormField>

        <FormField>
          <FormLabel error={errors.comment}>Комментарий</FormLabel>
          <FormTextArea
            {...register("comment", { maxLength: 200 })}
            maxLength={200}
            placeholder="Заполнить"
          />
          {errors.comment && (
            <FormErrorMessage>
              Комментарий не должен превышать 200 символов
            </FormErrorMessage>
          )}
        </FormField>

        <FormField>
          <FormLabel error={errors.file}>Загрузите файл</FormLabel>
          <FormInput
            type="file"
            {...register("file", {
              required: true,
              validate: {
                size: (value) => value[0]?.size <= 5242880,
                type: (value) => value[0]?.type === "application/pdf",
              },
            })}
            style={{ cursor: "pointer" }}
          />
          {errors.file && (
            <FormErrorMessage>
              Файл должен быть PDF и не больше 5MB
            </FormErrorMessage>
          )}
        </FormField>

        <h2>Итоговая сумма: {totalAmount}</h2>

        <SubmitButton type="submit">Отправить</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default Form;
