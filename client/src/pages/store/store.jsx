import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import Title from "antd/es/typography/Title";
import Container from "../../components/ui/atom/container";

const Store = () => {
  const columns = [
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "store",
      dataIndex: "store",
      key: "store",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];
  return (
    <div>
      <Row align="middle">
        <Col span={20}>
          <Title level={2}>Stores</Title>
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            onClick={() => {
              //   showDrawer();
              //   setRoleId(null);
              //   setDrawerTitle("New Role");
            }}
            icon={<PlusOutlined />}
          >
            New store
          </Button>
        </Col>
      </Row>
      <Container>
        <Table columns={columns}/>
      </Container>
    </div>
  );
};

export default Store;
