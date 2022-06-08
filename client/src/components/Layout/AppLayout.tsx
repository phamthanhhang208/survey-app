import { Layout } from 'antd';
import { FunctionComponent } from 'react';

interface AppLayoutProps {
  children: any;
}

const { Header, Content, Footer } = Layout;

const AppLayout: FunctionComponent<AppLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <Header></Header>
      <Content>{children}</Content>
      <Footer></Footer>
    </Layout>
  );
};

export default AppLayout;
