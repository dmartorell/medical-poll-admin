/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { fetchProjectNames } from '../helpers/fetchDB';
import NavBar from './NavBar';

const Header = () => {
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
