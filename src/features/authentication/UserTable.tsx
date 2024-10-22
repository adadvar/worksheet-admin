import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import UserRow from "./UserRow";
import { useUsers } from "./useUsers";

const UserTable = () => {
  const { isLoading, count, users } = useUsers();

  if (isLoading) return <Spinner />;

  if (!users?.length) return <Empty resourceName="users" />;

  return (
    <Menus>
      <Table columns="1fr 1fr 2fr 1fr">
        <Table.Header>
          <div>نام</div>
          <div>موبایل</div>
          <div>ایمیل</div>
          <div>نقش</div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user: any) => <UserRow key={user.id} user={user} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default UserTable;
