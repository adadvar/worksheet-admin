import AddProduct from "../features/products/AddProduct";
import ProductTable from "../features/products/ProductTable";
import ProductTableOperations from "../features/products/ProductTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Products = () => {
  return (
    <>
      <AddProduct />
      <Row type="horizontal">
        <Heading as="h1">تمامی کاربرگ‌‌ها</Heading>
        <ProductTableOperations />
      </Row>
      <Row>
        <ProductTable />
      </Row>
    </>
  );
};

export default Products;
