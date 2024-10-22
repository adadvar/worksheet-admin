import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateWorksheetForm from "./CreateWorksheetForm";

const AddWorksheet = () => {
  return (
    <>
      <Modal>
        <Modal.Open opens="worksheet-form">
          <Button>افزودن کاربرگ</Button>
        </Modal.Open>
        <Modal.Window name="worksheet-form">
          <CreateWorksheetForm />
        </Modal.Window>
      </Modal>
    </>
  );
};

export default AddWorksheet;
