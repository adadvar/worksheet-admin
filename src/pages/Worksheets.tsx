import AddWorksheet from "../features/worksheets/AddWorksheet";
import WorksheetTable from "../features/worksheets/WorksheetTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Worksheets = () => {
  return (
    <>
      <AddWorksheet />
      <Row type="horizontal">
        <Heading as="h1">تمامی کاربرگ‌‌ها</Heading>
        <span>filter / sort</span>
      </Row>
      <Row>
        <WorksheetTable />
      </Row>
    </>
  );
};

export default Worksheets;
