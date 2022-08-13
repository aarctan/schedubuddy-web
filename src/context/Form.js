import { createContext, useContext, useState } from "react";

const FormContext = createContext({
  errors: {},
  handleBlur: null,
  handleChange: null,
  setErrors: null,
  setValues: null,
  values: {},
});

export function FormProvider({ initialValues, children }) {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues({ ...values, [name]: value });
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  const value = {
    errors,
    handleBlur,
    handleChange,
    setErrors,
    setValues,
    values,
  };
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useLoading must be used within FormProvider");
  }
  return context;
};
