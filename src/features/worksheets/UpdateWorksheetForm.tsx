import React, { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { Worksheet } from "../../services/apiWorksheets";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import { useCreateWorksheet } from "./useCreateWorksheet";
import { useUpdateWorksheet } from "./useUpdateWorksheet";

import useCategoryOptions from "./useCategoryOptions";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { useUploadBanner } from "./useUploadBanner";
import { useUploadFile } from "./useUploadFile";

const UpdateWorksheetForm = ({
  onCloseModal,
  worksheetToUpdate,
}: {
  onCloseModal?: () => void;
  worksheetToUpdate: Worksheet;
}) => {
  const { isCreating } = useCreateWorksheet();
  const { isUpdating, updateWorksheet } = useUpdateWorksheet();
  const { uploadBanner } = useUploadBanner();
  const { uploadFile } = useUploadFile();

  const isWorking = isCreating || isUpdating;
  //@ts-ignore
  const { id: updateId, slug: updateSlug, ...updateValues } = worksheetToUpdate;
  const {
    name,
    price,
    description,
    grade_id,
    subject_id,
    topic_id,
    banner: bannerDef,
    file: fileDef,
  } = updateValues;
  const { register, handleSubmit, reset, formState, setValue } =
    useForm<Worksheet>({
      defaultValues: {
        name,
        price,
        description,
        grade_id,
        subject_id,
        topic_id,
        banner: bannerDef,
        file: fileDef,
      },
    });
  const [banner, setBanner] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const { errors } = formState;
  const memoizedUpdateValues = useMemo(
    () => updateValues,
    [
      name,
      price,
      description,
      grade_id,
      subject_id,
      topic_id,
      bannerDef,
      fileDef,
    ]
  );

  const {
    gradeOptions,
    subjectOptions,
    topicOptions,
    setSelectedGradeId,
    setSelectedSubjectId,
  } = useCategoryOptions();

  useEffect(() => {
    setSelectedGradeId(updateValues.grade_id);
    setSelectedSubjectId(updateValues.subject_id);

    setValue("grade_id", updateValues.grade_id);
    setValue("subject_id", updateValues.subject_id);
    setValue("topic_id", updateValues.topic_id);

    setBanner(null);
    setFile(null);
  }, [memoizedUpdateValues, setValue]);

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

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBanner(e.target.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (banner) {
      const formData = new FormData();
      formData.append("banner", banner);
      //@ts-ignore
      uploadBanner(formData, {
        onSuccess: (res) => {
          setBannerUrl(res.banner);
        },
      });
    }
  }, [banner]);

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      //@ts-ignore
      uploadFile(formData, {
        onSuccess: (res) => {
          setFileUrl(res.file);
        },
      });
    }
  }, [file]);

  const onSubmit: SubmitHandler<Worksheet> = async (data) => {
    const { name, price, description, grade_id, subject_id, topic_id } = data;

    const finalData = {
      name,
      price,
      description,
      grade_id,
      subject_id,
      topic_id,
    };

    //@ts-ignore
    if (bannerUrl) finalData.banner = bannerUrl;
    //@ts-ignore
    if (fileUrl) finalData.file = fileUrl;

    updateWorksheet(
      //@ts-ignore
      { newWorksheetData: finalData, slug: updateSlug },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  };

  const onError = (err: FieldErrors<Worksheet>) => {
    console.log(err);
  };

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
          defaultValue={updateValues.grade_id?.toString()}
          {...register("grade_id", { required: false })}
          onChange={handleGradeChange}
        />
      </FormRow>
      <FormRow label="درس" error={errors?.subject_id?.message}>
        <Select
          id="subject_id"
          type="white"
          disabled={isWorking}
          options={subjectOptions}
          defaultValue={updateValues.subject_id?.toString()}
          {...register("subject_id", { required: false })}
          onChange={handleSubjectChange}
        />
      </FormRow>
      <FormRow label="موضوع" error={errors?.topic_id?.message}>
        <Select
          id="topic_id"
          type="white"
          disabled={isWorking}
          options={topicOptions}
          defaultValue={updateValues.topic_id?.toString()}
          {...register("topic_id", { required: false })}
        />
      </FormRow>

      <FormRow label="عکس بنر">
        <FileInput
          id="banner"
          accept="image/*"
          type="file"
          {...register("banner", {
            required: false,
          })}
          onChange={handleBannerChange}
        />
      </FormRow>

      <FormRow label="فایل">
        <FileInput
          id="file"
          accept="application/pdf"
          type="file"
          {...register("file", {
            required: false,
          })}
          onChange={handleFileChange}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isWorking}
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          انصراف
        </Button>
        <Button disabled={isWorking}>{"ویرایش  کاربرگ"}</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateWorksheetForm;
