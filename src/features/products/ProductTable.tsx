import { Product } from "../../services/apiProducts";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useProducts } from "./useProducts";
import ProductRow from "./ProductRow";

const ProductTable = () => {
  const { isLoading, count, products } = useProducts();

  if (isLoading) return <Spinner />;

  if (!products?.length) return <Empty resourceName="products" />;

  return (
    <Menus>
      <Table columns="1fr 2fr 1fr 1fr 1fr 1fr 1fr 3.2rem">
        <Table.Header>
          <div>عکس</div>
          <div>نام</div>
          <div>پایه</div>
          <div>درس</div>
          <div>موضوع</div>
          <div>قیمت</div>
          <div>تاریخ</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={products}
          render={(product: Product) => (
            <ProductRow key={product.id} product={product} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default ProductTable;
