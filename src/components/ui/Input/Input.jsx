import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  id,
  children
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="form-group">
      <label htmlFor={id || name}>{label}</label>

      {type === 'password' ? (
        <div className="password-field">
          <input
            type={inputType}
            id={id || name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
          />
          <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
      ) : (
        <input
          type={type}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}

      {children}
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default Input;