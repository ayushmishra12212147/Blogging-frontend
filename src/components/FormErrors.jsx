import { useFormikContext } from 'formik'
import { isEmpty } from 'lodash-es'

const FormErrors=()=> {
  const { errors } = useFormikContext()

  if (isEmpty(errors)) return null

  return (
    <ul className="error-messages">
      {Object.entries(errors).map(([key, messages]) =>
        /** @type {string[]} */ (messages).map((message) => (
          <li key={`${key} ${message}`}>
            {key} {message}
          </li>
        ))
      )}
    </ul>
  )
}

export default FormErrors;