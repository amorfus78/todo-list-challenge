import classNames from "classnames"
import { Field } from "formik"

const FormField = (props) => {
  const { name, label, className, placeholder } = props

  const myField = (
    <Field name={name}>
      {({ field, meta }) => (
        <label className={classNames("flex flex-col gap-2", className)}>
          <span className="text-sm font-semibold">{label}</span>
          <input
            {...field}
            className="border-2 border-black px-2 py-1"
            placeholder={placeholder ?? label}
          />
          {meta.touched && meta.error ? (
            <span className="text-sm text-red-600 flex gap-2 items-center">
              {meta.error}
            </span>
          ) : null}
        </label>
      )}
    </Field>
  )

  return myField
}

export default FormField
