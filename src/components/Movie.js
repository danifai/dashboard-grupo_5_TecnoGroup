import React from 'react';

import MovieList from './MovieList';

class Movie extends React.Component {
	state = {
		productsList: [],
	}

	apiProductsResponse() {
		fetch('http://localhost:3002/api/products')
			.then(response => response.json())
			.then(products => {
				this.setState({
					productsList: products.products,
				});
			})
			.catch(err => console.log(err));
	}

	componentDidMount() {
		this.apiProductsResponse();
	}

	render() {
		return (<React.Fragment>
			{/*<!-- PRODUCTS LIST -->*/}
			<h1 className="h3 mb-2 text-gray-800">All products in the Database</h1>

			{/*<!-- DataTales Example -->*/}
			<div className="card shadow mb-4">
				<div className="card-body">
					<div className="table-responsive">
						<table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
							<thead>
								<tr>
									<th>Id</th>
									<th>Nombre</th>
									<th>Descripción</th>
								</tr>
							</thead>
							<tfoot>
								<tr>

								</tr>
							</tfoot>
							<tbody>
								{
									this.state.productsList.map((product, index) =>
										<tr>
											<td>{product.id}</td>
											<td>{product.name}</td>
											<td>{product.description}</td>
										</tr>
									)
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</React.Fragment>)
	}
}

export default Movie;