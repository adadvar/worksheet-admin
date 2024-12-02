import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateProductForm from "./CreateProductForm";

const AddProduct = () => {
  return (
    <>
      <Modal>
        <Modal.Open opens="product-form">
          <Button>افزودن کاربرگ</Button>
        </Modal.Open>
        <Modal.Window name="product-form">
          <CreateProductForm />
        </Modal.Window>
      </Modal>
    </>
  );
};

export default AddProduct;
