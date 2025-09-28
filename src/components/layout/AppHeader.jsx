import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context.jsx";
import { useState, useEffect } from "react";
import CoinInfoModal from "../CoinInfoModal.jsx";
import AddAssetForm from "../AddAssetForm.jsx";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  lineHeight: "64px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

// const options = [
//   {
//     label: "China",
//     value: "china",
//     emoji: "🇨🇳",
//     desc: "China (中国)",
//   },
//   {
//     label: "USA",
//     value: "usa",
//     emoji: "🇺🇸",
//     desc: "USA (美国)",
//   },
// ];

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(true);

  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (e) => {
      if (e.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 26 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
            Bitcoin
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add asset
      </Button>

      <Modal
        style={{ width: "40%" }}
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        width={600}
        title="Add Asset"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnHidden
      >
        <AddAssetForm />
      </Drawer>
    </Layout.Header>
  );
}
