import styled from "styled-components";

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ error }) => (error ? "red" : "#ccc")};
  border-radius: 6px;
  box-sizing: border-box;
`;

export default FormInput;
