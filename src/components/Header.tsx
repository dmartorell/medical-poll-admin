/* eslint-disable camelcase */
import React, { FC } from 'react';
import NavBar from './NavBar';
import { iProjects } from '../types';

type Props = {
  projects : iProjects[],
};
const Header: FC<Props> = ({ projects }) => (
  <header>
    <NavBar projects={projects} />
  </header>
    );

export default Header;
