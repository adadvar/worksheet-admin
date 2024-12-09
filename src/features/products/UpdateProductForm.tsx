import React, { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { Product } from "../../services/apiProducts";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import { useCreateProduct } from "./useCreateProduct";
import { useUpdateProduct } from "./useUpdateProduct";

import useCategoryOptions from "./useCategoryOptions";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { useUploadBanner } from "./useUploadBanner";
import { useUploadFile } from "./useUploadFile";
import Row from "../../ui/Row";

const UpdateProductForm = ({
  onCloseModal,
  productToUpdate,
}: {
  onCloseModal?: () => void;
  productToUpdate: Product;
}) => {
  const { isCreating } = useCreateProduct();
  const { isUpdating, updateProduct } = useUpdateProduct();
  const { uploadBanner } = useUploadBanner();
  const { uploadFile } = useUploadFile();

  const isWorking = isCreating || isUpdating;
  //@ts-ignore
  const { id: updateId, slug: updateSlug, ...updateValues } = productToUpdate;
  const {
    name,
    price,
    type,
    description,
    grade_id,
    subject_id,
    topic_id,
    banner: bannerDef,
    file_word,
    file_pdf,
  } = updateValues;
  const { register, handleSubmit, reset, formState, setValue } =
    useForm<Product>({
      defaultValues: {
        name,
        price,
        type,
        description,
        grade_id,
        subject_id,
        topic_id,
        banner: bannerDef,
        file_word,
        file_pdf,
      },
    });
  const [banner, setBanner] = useState<File | null>(null);
  const [fileWord, setFileWord] = useState<File | null>(null);
  const [filePdf, setFilePdf] = useState<File | null>(null);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [fileWordUrl, setFileWordUrl] = useState<string | null>(null);
  const [filePdfUrl, setFilePdfUrl] = useState<string | null>(null);

  const { errors } = formState;
  const memoizedUpdateValues = useMemo(
    () => updateValues,
    [
      name,
      price,
      type,
      description,
      grade_id,
      subject_id,
      topic_id,
      bannerDef,
      file_word,
      file_pdf,
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
    setFileWord(null);
    setFilePdf(null);
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

  const onSubmit: SubmitHandler<Product> = async (data) => {
    const { name, price, description, grade_id, subject_id, topic_id } = data;

    const finalData = {
      name,
      price,
      type,
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

    updateProduct(
      //@ts-ignore
      { newProductData: finalData, slug: updateSlug },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  };

  const onError = (err: FieldErrors<Product>) => {
    console.log(err);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <Row type="horizontal">
        <FormRow label="نام کاربرگ" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            autoFocus
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
              min: { value: 0, message: "قیمت حداقل باید 0 باشد." },
            })}
          />
        </FormRow>

        <FormRow label="نوع" error={errors?.type?.message}>
          <Select
            id="type"
            type="white"
            defaultValue="worksheet"
            options={[
              { value: "worksheet", label: "کاربرگ" },
              { value: "tools", label: "ابزار‌های آموزشی" },
            ]}
            {...register("type", { required: "این فیلد ضروری است." })}
          />
        </FormRow>
      </Row>
      <FormRow label="توضیحات کاربرگ" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description", { required: "این فیلد ضروری است." })}
        />
      </FormRow>
      <Row type="horizontal">
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
      </Row>
      <Row type="horizontal">
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

        <FormRow label="فایل pdf">
          <FileInput
            id="file_word"
            accept="application/pdf"
            type="file"
            {...register("file_word", {
              required: false,
            })}
            onChange={handleFilePdfChange}
          />
        </FormRow>

        <FormRow label="فایل word">
          <FileInput
            id="file_word"
            accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            type="file"
            {...register("file_word", {
              required: false,
            })}
            onChange={handleFileWordChange}
          />
        </FormRow>
      </Row>
      <Row type="horizontal">
        <FormRow>
          {/* type is an HTML attribute! */}
          <Button disabled={isWorking}>{"ویرایش  کاربرگ"}</Button>
        </FormRow>
        <FormRow>
          <Button
            disabled={isWorking}
            $variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            انصراف
          </Button>
        </FormRow>
      </Row>
    </Form>
  );
};

export default UpdateProductForm;
