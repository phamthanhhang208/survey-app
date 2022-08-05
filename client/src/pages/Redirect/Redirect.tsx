import { useEffect } from "react";
import { Spin } from "antd";

const Redirect = ({ url }: { url: string }) => {
	useEffect(() => {
		window.location.href = url;
	}, [url]);

	return (
		<div
			style={{
				margin: "20px 0",
				marginBottom: "20px",
				padding: "30px 50px",
				textAlign: "center",
				background: "rgba(0, 0, 0, 0.05)",
				borderRadius: "4px",
			}}
		>
			<Spin size="large" />
		</div>
	);
};

export default Redirect;
