import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateWorksheetForm from "./CreateWorksheetForm";

const AddWorksheet = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="worksheet-form">
          <Button>Add new worksheet</Button>
        </Modal.Open>
        <Modal.Window name="worksheet-form">
          <CreateWorksheetForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddWorksheet;
