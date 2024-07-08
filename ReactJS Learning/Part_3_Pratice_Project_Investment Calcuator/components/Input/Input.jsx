export default function Input({feildName,feildType,...props}) {

return(
    <p>
          <label htmlFor={feildName}>Initial Investement</label>
          <input
            type={feildType}
            name={feildName}
            {...props}
            required
          />
        </p>
)
}