import styled from "styled-components";

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ error }) => (error ? "red" : "#ccc")};
  border-radius: 6px;
  resize: none;
  box-sizing: border-box;
`;

export default FormTextArea;
