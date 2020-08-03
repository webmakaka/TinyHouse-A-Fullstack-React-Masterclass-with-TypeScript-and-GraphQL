import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Viewer } from 'lib/types';
import { LOG_OUT } from 'lib/graphql/mutations';
import { LogOut as LogOutData } from 'lib/graphql/mutations/LogOut/__generated__/LogOut';
import { Avatar, Button, Menu } from 'antd';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { displaySuccessNotificatin, displayErrorMessage } from 'lib/utils';

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

const { Item, SubMenu } = Menu;

export const MenuItems = ({ viewer, setViewer }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem('token');
        displaySuccessNotificatin("You'e successfully logged out!");
      }
    },
    onError: (data) => {
      displayErrorMessage(
        "Sorry! We weren't able to log you out. Please try again later!"
      );
    },
  });

  const hanleLogOut = () => {
    logOut();
  };
  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar src={viewer.avatar} />}>
        <Item key="/user">
          <Link to={`/user/${viewer.id}`}>
            <UserOutlined />
            Profile
          </Link>
        </Item>
        <Item key="/logout">
          <div onClick={hanleLogOut}>
            <LogoutOutlined />
            Log out
          </div>
        </Item>
      </SubMenu>
    ) : (
      <Item>
        <Link to="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </Item>
    );

  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/host">
        <Link to="/host">
          <HomeOutlined /> Host
        </Link>
      </Item>
      {subMenuLogin}
    </Menu>
  );
};
