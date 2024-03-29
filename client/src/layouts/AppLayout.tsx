import { Layout } from "antd";
import { FunctionComponent } from "react";
import "./AppLayout.scss";
import logo from "@/assets/logo-dhbkhn.png";
import { Link, useLocation } from "react-router-dom";
import { routePaths } from "@/const/routePaths";

interface AppLayoutProps {
	children: any;
}

const { Header, Content, Footer } = Layout;

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
	const location = useLocation();

	if (location.pathname === routePaths.SIGN_IN) {
		return <Content> {children} </Content>;
	}

	return (
		<div className="app-layout">
			<Layout>
				<Header>
					<div className="logo">
						<Link to={"/"}>
							<img src={logo} alt="" />
						</Link>
						<div className="logo-text">
							<span>HỆ THỐNG QUẢN TRỊ ĐẠI HỌC TRỰC TUYẾN</span>
							<span>
								TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI - TRƯỜNG CÔNG NGHỆ THÔNG TIN VÀ
								TRUYỀN THÔNG
							</span>
						</div>
					</div>
				</Header>
				<Content>{children}</Content>
				<Footer></Footer>
			</Layout>
		</div>
	);
};

export default AppLayout;
