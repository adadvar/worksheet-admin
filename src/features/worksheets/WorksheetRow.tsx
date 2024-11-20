import styled from "styled-components";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiDocumentText, HiEye, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Worksheet as WorksheetModel } from "../../services/apiWorksheets";
import UpdateWorksheetForm from "./UpdateWorksheetForm";
import { useDeleteWorksheet } from "./useDeleteWorksheet";
import BannerPreview from "./BannerPreview";
import { useDownloadPdf } from "./useDownloadPdf";
import { useDownloadWord } from "./useDownloadWord";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  cursor: pointer;
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
    slug: worksheetSlug,
    banner_link,
    name,
    price,
    grade: { name: grade },
    subject: { name: subject },
    topic: { name: topic },
    // file_link: pdf_link,
    age,
  } = worksheet;
  const { deleteWorksheet, isDeleting } = useDeleteWorksheet();
  const { downloadPdf } = useDownloadPdf();
  const { downloadWord } = useDownloadWord();
  return (
    <Table.Row>
      <Modal>
        <Modal.Open opens="banner">
          <Img src={banner_link} />
        </Modal.Open>
        <Worksheet>{name}</Worksheet>
        <Stacked>{grade}</Stacked>
        <Stacked>{subject}</Stacked>
        <Stacked>{topic}</Stacked>
        <Amount>{formatCurrency(price)}</Amount>
        <Stacked>{age}</Stacked>
        <Menus.Menu>
          <Menus.Toggle id={worksheetId} />
          <Menus.List id={worksheetId}>
            <Menus.Button
              onClick={() => downloadPdf(worksheetSlug)}
              icon={<HiDocumentText />}
            >
              pdf دانلود
            </Menus.Button>
            <Menus.Button
              onClick={() => downloadWord(worksheetSlug)}
              icon={<HiDocumentText />}
            >
              word دانلود
            </Menus.Button>
            <Modal.Open opens="detail">
              <Menus.Button icon={<HiEye />}>ویرایش</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>حذف</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="banner">
          <BannerPreview banner={worksheet.banner_link} />
        </Modal.Window>

        <Modal.Window name="detail">
          <UpdateWorksheetForm worksheetToUpdate={worksheet} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="کاربرگ"
            onConfirm={() => deleteWorksheet(worksheetSlug)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};

export default WorksheetRow;
