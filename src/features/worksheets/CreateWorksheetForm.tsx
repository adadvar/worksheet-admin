import React from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { Worksheet } from "../../services/apiWorksheets";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Row from "../../ui/Row";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import { useCreateWorksheet } from "./useCreateWorksheet";
import { useUpdateWorksheet } from "./useUpdateWorksheet";
import { useUploadBanner } from "./useUploadBanner";
import { useUploadFile } from "./useUploadFile";
import useCategoryOptions from "./useCategoryOptions";
import Button from "../../ui/Button";

const CreateWorksheetForm = ({
  onCloseModal,
  worksheetToUpdate = {},
}: {
  onCloseModal?: () => void;
  worksheetToUpdate?: Worksheet | {};
}) => {
  const { isCreating, createWorksheet } = useCreateWorksheet();
  const { isUpdating, updateWorksheet } = useUpdateWorksheet();
  const { isBannering, uploadBanner } = useUploadBanner();
  const { isFiling, uploadFile } = useUploadFile();

  const isWorking = isCreating || isUpdating;

  const { id: updateId, ...updateValues } = worksheetToUpdate;
  const isUpdateSession = Boolean(updateId);

  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm<Worksheet>({ defaultValues: isUpdateSession ? updateValues : {} });

  const { errors } = formState;

  const {
    gradeOptions,
    subjectOptions,
    topicOptions,
    setSelectedGradeId,
    setSelectedSubjectId,
  } = useCategoryOptions();

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gradeId = parseInt(e.target.value, 10);
    setSelectedGradeId(gradeId);
    setValue("grade_id", gradeId);
    setValue("subject_id", null);
    setValue("topic_id", null);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subjectId = parseInt(e.target.value, 10);
    setSelectedSubjectId(subjectId);
    setValue("subject_id", subjectId);
    setValue("topic_id", null);
  };

  const onSubmit: SubmitHandler<Worksheet> = (data) => {
    if (isUpdateSession)
      updateWorksheet(
        { newWorksheetData: data, id: updateId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createWorksheet(data, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
  };

  const onError = (err: FieldErrors<Worksheet>) => {};

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="نام کاربرگ" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "این فیلد ضروری است." })}
        />
      </FormRow>

      <FormRow label="قیمت کاربرگ" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          disabled={isWorking}
          {...register("price", {
            required: "این فیلد ضروری است.",
            min: { value: 1, message: "قیمت حداقل باید 1 باشد." },
          })}
        />
      </FormRow>

      <FormRow label="توضیحات کاربرگ" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description", { required: "این فیلد ضروری است." })}
        />
      </FormRow>

      <FormRow label="پایه" error={errors?.grade_id?.message}>
        <Select
          id="grade_id"
          type="white"
          disabled={isWorking}
          options={gradeOptions}
          {...register("grade_id", { required: "این فیلد ضروری است." })}
          onChange={handleGradeChange}
        />
      </FormRow>
      <FormRow label="درس" error={errors?.subject_id?.message}>
        <Select
          id="subject_id"
          type="white"
          disabled={isWorking}
          options={subjectOptions}
          {...register("subject_id", { required: "این فیلد ضروری است." })}
          onChange={handleSubjectChange}
        />
      </FormRow>
      <FormRow label="موضوع" error={errors?.topic_id?.message}>
        <Select
          id="topic_id"
          type="white"
          disabled={isWorking}
          options={topicOptions}
          {...register("topic_id", { required: "این فیلد ضروری است." })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          انصراف
        </Button>
        <Button disabled={isWorking}>
          {isUpdateSession ? "ویرایش  کاربرگ" : "افزودن کاربرگ جدید"}
        </Button>
      </FormRow>
    </Form>
  );
};

export default CreateWorksheetForm;
