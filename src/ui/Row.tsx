import styled, { css } from "styled-components";

interface Props {
  type?: "horizontal" | "vertical";
}

const Row = styled.div<Props>`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      flex-direction: row-reverse;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      flex-direction: column-reverse;
    `}
      gap: 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
