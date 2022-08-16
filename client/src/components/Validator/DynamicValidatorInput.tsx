import { Form, Input, InputNumber } from "antd";

interface DynamicValidationInputProps {
	operator: string;
}

const DynamicValidationInput = ({ operator }: DynamicValidationInputProps) => {
	switch (operator) {
		default:
			break;
		case "max":
			return (
				<Form.Item name={["validator", "max"]} rules={[{ required: true }]}>
					<InputNumber placeholder="Number" />
				</Form.Item>
			);
		//break;
		case "min":
			return (
				<Form.Item name={["validator", "min"]} rules={[{ required: true }]}>
					<InputNumber placeholder="Number" />
				</Form.Item>
			);
		case "inBetween":
			return (
				<div style={{ display: "flex", gap: 8 }}>
					<Form.Item name={["validator", "min"]} rules={[{ required: true }]}>
						<InputNumber placeholder="From" />
					</Form.Item>
					<span style={{ transform: "translateY(5px)" }}>to</span>
					<Form.Item name={["validator", "max"]} rules={[{ required: true }]}>
						<InputNumber placeholder="To" />
					</Form.Item>
				</div>
			);
		case "pattern":
			return (
				<Form.Item name={["validator", "pattern"]} rules={[{ required: true }]}>
					<Input placeholder="Regex" />
				</Form.Item>
			);
		//break;
	}

	return null;
};

export default DynamicValidationInput;
