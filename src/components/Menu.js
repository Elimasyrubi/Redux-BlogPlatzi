import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => (
	<nav id='menu' className="text-center">
		<Link className ="btn btn-outline-light mr-4"  to='/'>
			Usuarios
		</Link>
		<Link className ="btn btn-outline-light" to='/tareas'>
			Tareas
		</Link>
	</nav>
);

export default Menu;