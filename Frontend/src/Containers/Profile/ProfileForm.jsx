import { useState } from "react";
import GenericForm from "../../components/Forms/GenericForm";
import PageHeader from "../../components/navigation/PageHeader";
import { useUpdateUser } from "../../hooks/useUsers";
import { useAuthStore } from "../../store/authStore";

const ProfileForm = () => {
  const auth = useAuthStore.getState();
  const [initialState, setInitialState] = useState({
    profile_image: auth.profile_image || null,
    first_name: auth.first_name || "",
    last_name: auth.last_name || "",
  });

  const { mutateAsync, isPending } = useUpdateUser();

  if (isPending) return <p>Pending...</p>;

  const submitHandler = async (data) => {
    try {
      const response = await mutateAsync({
        first_name: data.first_name,
        last_name: data.last_name,
        profile_image: data.profile_image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageHeader backTo={"/dashboard"} title={"User Profile"} />
      <GenericForm
        initialState={initialState}
        validationRules={{
          first_name: { required: true },
          last_name: { required: true },
          profile_image: { required: false },
        }}
        fieldConfigs={{
          first_name: { label: "First Name" },
          last_name: { label: "Last Name" },
          profile_image: { label: "Profile Picture", type: "file" },
        }}
        onSubmit={submitHandler}
        submitLabel="Save"
        redirectUrl="/dashboard"
      />
    </>
  );
};

export default ProfileForm;
