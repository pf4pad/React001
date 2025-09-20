import { Layout, Select, Space, Button } from "antd";
import { useCrypto } from "../../context/crypto-context.jsx";
import { useState, useEffect } from "react";
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
    console.log("Selected:", value);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        value="press / to open"
        optionLabelProp="label"
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
      <Button type="primary">Add asset</Button>
    </Layout.Header>
  );
}
