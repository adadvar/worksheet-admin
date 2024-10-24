import { Worksheet } from "../../services/apiWorksheets";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useWorksheets } from "./useWorksheets";
import WorksheetRow from "./WorksheetRow";

const WorksheetTable = () => {
  const { isLoading, count, worksheets } = useWorksheets();

  if (isLoading) return <Spinner />;

  if (!worksheets?.length) return <Empty resourceName="worksheets" />;

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
          data={worksheets}
          render={(worksheet: Worksheet) => (
            <WorksheetRow key={worksheet.id} worksheet={worksheet} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default WorksheetTable;
