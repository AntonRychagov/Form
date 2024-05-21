import styled from "styled-components";

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${({ error }) => (error ? "red" : "rgba(147, 148, 170, 1)")};
`;

export default FormLabel;
