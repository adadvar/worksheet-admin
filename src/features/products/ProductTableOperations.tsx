import Filter from "../../ui/Filter";
import FilterSelect from "../../ui/FilterSelect";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const ProductTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="publish"
        options={[
          { value: "all", label: "همه" },
          { value: "with-publish", label: "منتشرشده‌ها" },
          { value: "no-publish", label: "منتشرنشده‌ها" },
        ]}
      />

      <FilterSelect
        filterField="grade"
        options={[
          { value: "1", label: "اول" },
          { value: "2", label: "دوم" },
          { value: "3", label: "سوم" },
          { value: "4", label: "چهارم" },
          { value: "5", label: "پنجم" },
          { value: "6", label: "ششم" },
        ]}
      />

      <FilterSelect
        filterField="subject"
        options={[
          { value: "1", label: "ریاضی" },
          { value: "2", label: "فارسی" },
          { value: "3", label: "تاریخ" },
          { value: "4", label: "جغرافی" },
          { value: "5", label: "هنر" },
          { value: "6", label: "نقاشی" },
        ]}
      />

      <SortBy
        options={[
          { value: "price-asc", label: "ارزان‌ترین" },
          { value: "price-desc", label: "گران‌ترین" },
          { value: "date-asc", label: "تازه‌ترین" },
          { value: "date-desc", label: "قدیمی‌ترین" },
        ]}
      />
    </TableOperations>
  );
};

export default ProductTableOperations;
