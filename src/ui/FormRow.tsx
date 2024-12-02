import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  width: 100%;

  margin: 2.4rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  /* &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
  text-align: right;
  white-space: nowrap;
  width: 100%;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface Props {
  label?: string;
  error?: string;
  children: React.ReactNode | any;
}

const FormRow = ({ label, error, children }: Props) => {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

export default FormRow;
