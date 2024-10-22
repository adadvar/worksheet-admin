import styled from "styled-components";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiEye, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Worksheet as WorksheetModel } from "../../services/apiWorksheets";
import UpdateWorksheetForm from "./UpdateWorksheetForm";
import { useDeleteWorksheet } from "./useDeleteWorksheet";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Worksheet = styled.div`
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
const WorksheetRow = ({ worksheet }: { worksheet: WorksheetModel }) => {
  const {
    id: worksheetId,
    banner_link,
    name,
    price,
    grade: { name: grade },
    subject: { name: subject },
    topic: { name: topic },
    age,
  } = worksheet;
  const { deleteWorksheet, isDeleting } = useDeleteWorksheet();
  return (
    <Table.Row>
      <Img src={banner_link} />
      <Worksheet>{name}</Worksheet>
      <Stacked>{grade}</Stacked>
      <Stacked>{subject}</Stacked>
      <Stacked>{topic}</Stacked>
      <Amount>{formatCurrency(price)}</Amount>
      <Stacked>{age}</Stacked>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={worksheetId} />
          <Menus.List id={worksheetId}>
            <Modal.Open opens="detail">
              <Menus.Button icon={<HiEye />}>ویرایش</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>حذف</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="detail">
          <UpdateWorksheetForm worksheetToUpdate={worksheet} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="کاربرگ"
            onConfirm={() => deleteWorksheet(worksheetId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};

export default WorksheetRow;
