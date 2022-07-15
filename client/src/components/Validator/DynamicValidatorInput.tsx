import { Form, Input, InputNumber } from 'antd';

interface DynamicValidationInputProps {
  operator: string;
}

const DynamicValidationInput = ({ operator }: DynamicValidationInputProps) => {
  switch (operator) {
    default:
      break;
    case 'max':
      return (
        <Form.Item name={['validator', 'max']} rules={[{ required: true }]}>
          <InputNumber placeholder='Number' />
        </Form.Item>
      );
    //break;
    case 'min':
      return (
        <Form.Item name={['validator', 'min']} rules={[{ required: true }]}>
          <InputNumber placeholder='Number' />
        </Form.Item>
      );
    case 'inBetween':
      return (
        <>
          <Form.Item name={['validator', 'min']} rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          to
          <Form.Item name={['validator', 'max']} rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
        </>
      );
    case 'pattern':
      return (
        <Form.Item name={['validator', 'pattern']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      );
    //break;
  }

  return null;
};

export default DynamicValidationInput;
