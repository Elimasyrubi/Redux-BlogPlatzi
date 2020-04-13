import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as tareasActions from '../../actions/tareasActions';

class Guardar extends Component {
	componentDidMount() {
		const {
			match: { params: { usu_id, tar_id } },
			tareas,
			cambioUsuarioId,
			cambioTitulo,
			limpiarForma
		} = this.props;

		if (usu_id && tar_id) {
			const tarea = tareas[usu_id][tar_id];
			cambioUsuarioId(tarea.userId);
			cambioTitulo(tarea.title);
		}
		else {
			limpiarForma();
		}
	}

	cambioUsuarioId = (event) => {
		this.props.cambioUsuarioId(event.target.value);
	};

	cambioTitulo = (event) => {
		this.props.cambioTitulo(event.target.value);
	};

	guardar = () => {
		const {
			match: { params: { usu_id, tar_id } },
			tareas,
			usuario_id,
			titulo,
			agregar,
			editar
		} = this.props;

		const nueva_tarea = {
			userId: usuario_id,
			title: titulo,
			completed: false
		};

		if (usu_id && tar_id) {
			const tarea = tareas[usu_id][tar_id];
			const tarea_editada = {
				...nueva_tarea,
				completed: tarea.completed,
				id: tarea.id
			};
			editar(tarea_editada);
		}
		else {
			agregar(nueva_tarea);
		}
	};

	deshabilitar = () => {
		const { usuario_id, titulo, cargando } = this.props;
		if (cargando) {
			return true;
		}
		if (!usuario_id || !titulo) {
			return true;
		}
		return false;
	};

	mostrarAccion = () => {
		const { error, cargando } = this.props;
		if (cargando) {
			return <Spinner />;
		}
		if (error) {
			return <Fatal mensaje={error} />;
		}
	};

	render() {
		return (
			<div className="card tarjeta">
				{
					(this.props.regresar) ?
					<Redirect to='/tareas' />
					: ''
				}

					<h1 className="card-header">Guardar Tarea</h1>
				<div className="p-4">
					Usuario id:
					<input
						className="form-control"
						type='number'
						value={ this.props.usuario_id }
						onChange={ this.cambioUsuarioId }
					/>
					<br /><br />
					Título:
					<input
						className="form-control"
						value={ this.props.titulo }
						onChange={ this.cambioTitulo }
					/>
					<br /><br />
					<div className="text-center">
						<button
							className="btn btn-success guardar"
							disabled={ this.deshabilitar() }
							onClick={ this.guardar }
						>
							Guardar
						</button>
					</div>
				</div>
				{ this.mostrarAccion() }
			</div>
		);
	}
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);