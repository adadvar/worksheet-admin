import styled from "styled-components";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiDocumentText, HiEye, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Product as ProductModel } from "../../services/apiProducts";
import UpdateProductForm from "./UpdateProductForm";
import { useDeleteProduct } from "./useDeleteProduct";
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

const Product = styled.div`
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
const ProductRow = ({ product }: { product: ProductModel }) => {
  const {
    id: productId,
    slug: productSlug,
    banner_link,
    name,
    price,
    grade: { name: grade },
    subject: { name: subject },
    topic: { name: topic },
    // file_link: pdf_link,
    age,
  } = product;
  const { deleteProduct, isDeleting } = useDeleteProduct();
  const { downloadPdf } = useDownloadPdf();
  const { downloadWord } = useDownloadWord();
  return (
    <Table.Row>
      <Modal>
        <Modal.Open opens="banner">
          <Img src={banner_link} />
        </Modal.Open>
        <Product>{name}</Product>
        <Stacked>{grade}</Stacked>
        <Stacked>{subject}</Stacked>
        <Stacked>{topic}</Stacked>
        <Amount>{formatCurrency(price)}</Amount>
        <Stacked>{age}</Stacked>
        <Menus.Menu>
          <Menus.Toggle id={productId} />
          <Menus.List id={productId}>
            <Menus.Button
              onClick={() => downloadPdf({ slug: productSlug, name })}
              icon={<HiDocumentText />}
            >
              pdf دانلود
            </Menus.Button>
            <Menus.Button
              onClick={() => downloadWord({ slug: productSlug, name })}
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
          <BannerPreview banner={product.banner_link} />
        </Modal.Window>

        <Modal.Window name="detail">
          <UpdateProductForm productToUpdate={product} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="کاربرگ"
            onConfirm={() => deleteProduct(productSlug)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};

export default ProductRow;
