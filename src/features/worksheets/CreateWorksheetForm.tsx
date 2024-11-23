import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { Worksheet } from "../../services/apiWorksheets";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import { useCreateWorksheet } from "./useCreateWorksheet";

import useCategoryOptions from "./useCategoryOptions";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { useUploadBanner } from "./useUploadBanner";
import { useUploadFile } from "./useUploadFile";

const CreateWorksheetForm = ({
  onCloseModal,
}: {
  onCloseModal?: () => void;
}) => {
  const { isCreating, createWorksheet } = useCreateWorksheet();
  const { uploadBanner } = useUploadBanner();
  const { uploadFile } = useUploadFile();

  const isWorking = isCreating;
  //@ts-ignore
  const { register, handleSubmit, reset, formState, setValue } =
    useForm<Worksheet>();
  const [banner, setBanner] = useState<File | null>(null);
  const [fileWord, setFileWord] = useState<File | null>(null);
  const [filePdf, setFilePdf] = useState<File | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [fileWordUrl, setFileWordUrl] = useState<string | null>(null);
  const [filePdfUrl, setFilePdfUrl] = useState<string | null>(null);
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

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBanner(e.target.files[0]);
    }
  };

  const handleFileWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileWord(e.target.files[0]);
    }
  };

  const handleFilePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFilePdf(e.target.files[0]);
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
    if (fileWord) {
      const formData = new FormData();
      formData.append("file", fileWord);
      //@ts-ignore
      uploadFile(formData, {
        onSuccess: (res) => {
          setFileWordUrl(res.file);
        },
      });
    }
  }, [fileWord]);

  useEffect(() => {
    if (filePdf) {
      const formData = new FormData();
      formData.append("file", filePdf);
      //@ts-ignore
      uploadFile(formData, {
        onSuccess: (res) => {
          setFilePdfUrl(res.file);
        },
      });
    }
  }, [filePdf]);

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
    if (fileWordUrl) finalData.file_word = fileWordUrl;
    //@ts-ignore
    if (filePdfUrl) finalData.file_pdf = filePdfUrl;

    //@ts-ignore
    createWorksheet(finalData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
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

      <FormRow label="عکس بنر">
        <FileInput
          id="banner"
          accept="image/*"
          type="file"
          {...register("banner", {
            required: "این فیلد ضروری است.",
          })}
          onChange={handleBannerChange}
        />
      </FormRow>

      <FormRow label="pdf فایل">
        <FileInput
          id="file_pdf"
          accept="application/pdf"
          type="file"
          {...register("file_pdf", {
            required: "این فیلد ضروری است.",
          })}
          onChange={handleFilePdfChange}
        />
      </FormRow>

      <FormRow label="word فایل">
        <FileInput
          id="file_word"
          accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          type="file"
          {...register("file_word", {
            required: "این فیلد ضروری است.",
          })}
          onChange={handleFileWordChange}
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
        <Button disabled={isWorking}>{"افزودن کاربرگ جدید"}</Button>
      </FormRow>
    </Form>
  );
};

export default CreateWorksheetForm;
