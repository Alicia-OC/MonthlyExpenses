import { useState } from 'react';

const ShowPasswordInput = ({ onDataChange }) => {
  const [pwVisibility, setPwVisibility] = useState(false);

  return (
    <div className="form-check d-flex justify-content-center mb-4">
      <input
        className="form-check-input me-2"
        type="checkbox"
        value=""
        id="show-pw"
        onClick={(e) => {
          setPwVisibility(!pwVisibility);
          onDataChange(!pwVisibility);
        }}
      />
      <label className="form-check-label" htmlFor="show-pw">
       <p>Show password</p> 
      </label>
    </div>
  );
};

export default ShowPasswordInput;
