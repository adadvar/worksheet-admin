import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiEye, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import UpdateUserForm from "./UpdateUserForm";
import { useDeleteUser } from "./useDelete";
import { User as UserProp } from "../../services/apiAuth";

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
const UserRow = ({ user }: { user: UserProp }) => {
  const {
    id: userId,
    name,
    mobile,
    email,
    roles: [{ name: role }],
  } = user;
  const { isDeleting, deleteUser } = useDeleteUser();
  return (
    <Table.Row>
      <User>{name}</User>
      <Stacked>{mobile}</Stacked>
      <Stacked>{email}</Stacked>
      <Stacked>{role}</Stacked>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={userId} />
          <Menus.List id={userId}>
            <Modal.Open opens="detail">
              <Menus.Button icon={<HiEye />}>ویرایش</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>حذف</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="detail">
          <UpdateUserForm userToUpdate={user} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="کاربر"
            onConfirm={() => deleteUser(userId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};

export default UserRow;
