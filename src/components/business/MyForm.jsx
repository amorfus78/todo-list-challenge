import { Formik, Form } from "formik"
import FormField from "../ui/FormField"
import * as yup from "yup"

const MyForm = (props) => {
  const { isFormDisplayed, handleSubmit, initialValues } = props

  const validationSchema = yup.object().shape({
    name: yup.string().required().label("name"),
  })

  const primaryButton =
    "bg-blue-600 active:bg-blue-700 disabled:bg-slate-400 text-white font-semibold px-2 py-1"

  const myForm = (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, isValid }) => (
        <Form className="flex flex-col gap-4 p-4">
          <FormField label="Name" name="name" />
          <button
            disabled={isSubmitting || !isValid}
            type="submit"
            className={primaryButton}
          >
            Click Me
          </button>
        </Form>
      )}
    </Formik>
  )

  if (isFormDisplayed) {
    return myForm
  }
}

export default MyForm
