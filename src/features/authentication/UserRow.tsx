import styled from "styled-components";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const User = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;
//@ts-ignore
const Price = styled.div`
  font-weight: 600;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-weight: 500;
`;
const UserRow = ({ user }: { user: any }) => {
  const {
    id: userId,
    name,
    mobile,
    email,
    roles: [{ name: role }],
  } = user;
  return (
    <Table.Row>
      <User>{name}</User>
      <Stacked>{mobile}</Stacked>
      <Stacked>{email}</Stacked>
      <Stacked>{role}</Stacked>
    </Table.Row>
  );
};

export default UserRow;
