import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
} from "antd";
import { useCrypto } from "../context/crypto-context.jsx";
import { useState } from "react";

const validateMessages = {
  required: "'${label}' is required!",
  types: {
    number: "'${label}' is not a valid number!",
  },
  number: {
    range: "'${label}' must be between ${min} and ${max}",
  },
};

export default function AddAssetForm() {
  const [form] = Form.useForm();
  const [coin, setCoin] = useState(null);
  const { crypto } = useCrypto();

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        value="Select a coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
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
    );
  }

  const handelAmountChange = (value) => {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  };

  const handelPriceChange = (value) => {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  <Typography.Title level={2} style={{ margin: 0 }}>
    <Flex align="center" direction="column" gap={16}>
      <img
        src={coin.icon}
        alt={coin.name}
        style={{ width: 40, marginRight: 10 }}
      />
      <Typography.Title level={2} style={{ margin: 0 }}>
        {coin.name} ({coin.symbol})
      </Typography.Title>
    </Flex>
    <Divider />
  </Typography.Title>;
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: +coin.price.toFixed(2),
        amount: 0,
        total: 0,
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handelAmountChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handelPriceChange} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Date & Time" name="Date">
        <DatePicker showTime style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
