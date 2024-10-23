import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import { useUpdateUser } from "./useUpdateUser";
import { User } from "../../services/apiAuth";

const UpdateUserForm = ({
  onCloseModal,
  userToUpdate,
}: {
  onCloseModal?: () => void;
  userToUpdate: User;
}) => {
  const { isUpdating, updateUser } = useUpdateUser();

  const isWorking = isUpdating;
  //@ts-ignore
  const { id: updateId, ...updateValues } = userToUpdate;
  const {
    name,
    mobile,
    email,
    roles: [{ id: roleId }],
  } = updateValues;
  const { register, handleSubmit, reset, formState } = useForm<User>({
    defaultValues: {
      name,
      mobile,
      email,
    },
  });
  const { errors } = formState;

  const onSubmit: SubmitHandler<User> = async (data) => {
    //@ts-ignore
    const { name, mobile, email, role_id } = data;

    const finalData = {
      name,
      mobile,
      email,
      role_id,
    };

    updateUser(
      //@ts-ignore
      { newUserData: finalData, id: updateId },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  };

  const onError = (err: FieldErrors<User>) => {
    console.log(err);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="نام کاربر" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "این فیلد ضروری است." })}
        />
      </FormRow>

      <FormRow label="موبایل" error={errors?.mobile?.message}>
        <Input
          type="text"
          id="mobile"
          disabled={isWorking}
          {...register("mobile", { required: false })}
        />
      </FormRow>

      <FormRow label="نقش">
        <Select
          id="role_id"
          type="white"
          disabled={isWorking}
          defaultValue={roleId}
          //@ts-ignore
          {...register("role_id", { required: false })}
          options={[
            { value: "1", label: "ادمین" },
            { value: "2", label: "معلم" },
            { value: "3", label: "دانش آموز" },
            { value: "4", label: "والدین" },
          ]}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isWorking}
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          انصراف
        </Button>
        <Button disabled={isWorking}>{"ویرایش  کاربر"}</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserForm;
