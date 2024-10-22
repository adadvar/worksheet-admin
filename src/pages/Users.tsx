import UserTable from "../features/authentication/UserTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Users = () => {
  return (
    <>
      <Heading as="h1">تمامی کاربرها</Heading>

      <Row>
        <UserTable />
      </Row>
    </>
  );
};

export default Users;
