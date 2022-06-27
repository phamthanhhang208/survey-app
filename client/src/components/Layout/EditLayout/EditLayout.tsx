import { Layout } from 'antd';
import { FunctionComponent } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './EditLayout.scss';

interface EditLayoutProps {
  children: any;
}

const { Content } = Layout;

const EditLayout: FunctionComponent<EditLayoutProps> = ({ children }) => {
  const params = useParams();

  return (
    <div className='edit-layout'>
      <div className='edit-layout-header'>
        <NavLink className='edit-items' to={`/forms/${params.id}/edit`}>
          <span>Questions</span>
        </NavLink>
        <NavLink
          className='edit-items'
          to={`/forms/${params.id}/edit-response`}
        >
          <span>Response</span>
        </NavLink>
        <NavLink className='edit-items' to={`/forms/${params.id}/edit-setting`}>
          <span>Setting</span>
        </NavLink>
      </div>
      <Content className='edit-layout-content'>{children}</Content>
    </div>
  );
};

export default EditLayout;
