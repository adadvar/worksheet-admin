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
          <div>image</div>
          <div>name</div>
          <div>grade</div>
          <div>subject</div>
          <div>topic</div>
          <div>price</div>
          <div>date</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={worksheets}
          render={(worksheet: any) => (
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
