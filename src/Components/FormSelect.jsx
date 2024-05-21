import styled from "styled-components";

const FormSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid ${({ error }) => (error ? "red" : "#ccc")};
  border-radius: 6px;
`;

export default FormSelect;
