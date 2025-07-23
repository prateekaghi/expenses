import GenericForm from "../../components/Forms/GenericForm";
import { useUpdateUser } from "../../hooks/useUsers";

const ProfileForm = () => {
  const { mutateAsync, isPending } = useUpdateUser();

  if (isPending) return <p>Pending...</p>;

  const submitHandler = async (data) => {
    try {
      const response = await mutateAsync({
        first_name: data.first_name,
        last_name: data.last_name,
        timezone: data.timezone,
        profile_image: data.profile_image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GenericForm
      initialState={{
        profile_image: null,
        first_name: "",
        last_name: "",
        timezone: "",
      }}
      validationRules={{
        first_name: { required: true },
        last_name: { required: true },
        timezone: { required: false },
        profile_image: { required: false },
      }}
      fieldConfigs={{
        first_name: { label: "First Name" },
        last_name: { label: "Last Name" },
        timezone: { label: "Timezone" },
        profile_image: { label: "Profile Picture", type: "file" },
      }}
      onSubmit={submitHandler}
      submitLabel="Save"
      redirectUrl="/profile"
    />
  );
};

export default ProfileForm;
