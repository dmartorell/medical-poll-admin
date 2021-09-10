/* eslint-disable camelcase */
import React, { FC, useState, useEffect } from 'react';
import NavBar from './NavBar';
import { fetchProjectNames } from '../helpers/fetchDB';

const Header: FC = () => {
  const [projectNames, setProjectNames] = useState([]);
  useEffect(() => {
    fetchProjectNames()
    .then((data: any) => setProjectNames(data));
  }, []);
  return (
    <header>
      <NavBar projects={projectNames} />
    </header>
    );
};

export default Header;
