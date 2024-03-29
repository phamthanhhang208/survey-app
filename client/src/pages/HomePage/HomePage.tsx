import { FunctionComponent, useEffect, useState } from "react";
import "./HomePage.scss";
import { Input, Button, Tooltip, Modal, Form } from "antd";
import MyTable from "@/components/MyTable/MyTable";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useForms, useCreateForm, useDeleteForm } from "@/hooks/form.hook";
import dayjs from "dayjs";
import { nonAccentVietnamese } from "@/utils/utils";

interface HomePageProps {}

const { Item } = Form;

const HomePage: FunctionComponent<HomePageProps> = () => {
	let navigate = useNavigate();
	const { data, isFetching } = useForms();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { mutate: createForm } = useCreateForm();
	const { mutate: deleteForm } = useDeleteForm();
	const [form] = Form.useForm();
	const [dataSource, setDataSource] = useState<any>([]);
	const [firstTime, setFirstTime] = useState<boolean>(true);
	const [search, setSearch] = useState<any>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (firstTime && data) {
			setDataSource(data);
			setFirstTime(false);
		}
	}, [data, firstTime]);

	useEffect(() => {
		if (!search) {
			return setDataSource(data);
		}

		setLoading(true);

		const tmp = data?.filter((el: any) =>
			nonAccentVietnamese(el.title)
				?.toLowerCase()
				.includes(nonAccentVietnamese(search)?.toLowerCase())
		);

		setTimeout(() => {
			setLoading(false);
			setDataSource(tmp);
		}, 600);
	}, [data, search]);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		form.submit();
		form.getFieldValue("form-name") && setIsModalVisible(false);
	};

	const handleSubmit = (data: any) => {
		const newForm = {
			title: data["form-name"],
			description: data["form-description"],
		};
		createForm(newForm);
		form.resetFields();
	};

	const handleCancel = () => {
		form.resetFields();
		setIsModalVisible(false);
	};

	const handleDelete = (v: any) => {
		deleteForm(v);
	};

	const handleEdit = (v: any) => {
		navigate(`/forms/${v}/edit`);
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "title",
			width: 1000,

			render: (v: any, record: any) => {
				return (
					<Link key={record._id} to={`/forms/${record?._id}/edit`}>
						{v}
					</Link>
				);
			},
		},
		{
			title: "Last Edited",
			dataIndex: "updatedAt",
			width: 200,
			render: (v: any) => {
				return dayjs.unix(v).format("DD-MM-YYYY");
			},
		},
		{
			title: "Actions",
			dataIndex: "name",
			width: 100,
			required: true,
			render: (v: any, record: any) => {
				return (
					<div className="actions" key={record._id}>
						<Tooltip
							title={"Edit form"}
							mouseEnterDelay={0.05}
							mouseLeaveDelay={0.05}
						>
							<EditOutlined onClick={() => handleEdit(record?._id)} />
						</Tooltip>
						<Tooltip
							title={"Delete form"}
							mouseEnterDelay={0.05}
							mouseLeaveDelay={0.05}
						>
							<DeleteOutlined
								className="delete-icon"
								onClick={() => handleDelete(record?._id)}
							/>
						</Tooltip>
					</div>
				);
			},
		},
	];

	const handleSearchChange = (v: any) => {
		setSearch(v.target.value);
	};

	return (
		<div className="home-page">
			<div className="functions">
				<Input
					className="search-input"
					placeholder="Search"
					allowClear
					value={search}
					onChange={handleSearchChange}
				/>
				<Button type="primary" onClick={showModal}>
					New form
				</Button>
			</div>
			<MyTable
				columns={columns}
				dataSource={dataSource}
				rowKey={(item) => item?._id}
				loading={isFetching || loading}
			/>
			<Modal
				title="Create new form"
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} layout="vertical" onFinish={handleSubmit}>
					<Item
						label={"Form name:"}
						rules={[
							{ required: true, message: "Form name must not be empty." },
						]}
						name={"form-name"}
					>
						<Input placeholder="Form name" />
					</Item>
					<Item label={"Description:"} name={"form-description"}>
						<Input.TextArea placeholder="Description" />
					</Item>
				</Form>
			</Modal>
		</div>
	);
};

export default HomePage;
