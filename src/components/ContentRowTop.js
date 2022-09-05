import React from 'react';
import imagenFondo from '../assets/images/mandalorian.jpg';
import CategoriesInDb from './CategoriesInDb';
import ContentRowMovies from './ContentRowMovies';

class ContentRowTop extends React.Component {
	state = {
		productsList: [],
		lastProduct: [],
		categoriesList: [],
		usersList: [],
		productsTotal: '',
		categoriesTotal: '',
		usersTotal: '',
	}

	apiProductsResponse() {
		fetch('http://localhost:3002/api/products')
			.then(response => response.json())
			.then(products => {
				this.setState({
					productsList: products.products,
					lastProduct: products.products[products.count - 1].images[0].name,
					productsTotal: products.count,
				});
				//console.log(this.state.lastProduct.images[0].name)
			})
			.catch(err => console.log(err));
	}



	apiCategoriesResponse() {
		fetch('http://localhost:3002/api/categories')
			.then(response => response.json())
			.then(categories => {
				this.setState({
					categoriesList: categories.data,
					categoriesTotal: categories.meta.total
				});
			})
			.catch(err => console.log(err));
	}

	apiUsersResponse() {
		fetch('http://localhost:3002/api/users')
			.then(response => response.json())
			.then(users => {
				this.setState({
					usersList: users.data,
					usersTotal: users.meta.total
				});
			})
			.catch(err => console.log(err));
	}

	componentDidMount() {
		this.apiProductsResponse();
		this.apiCategoriesResponse();
		this.apiUsersResponse();
	}

	lastProductImage() {
		// const productImage = 
		// 	this.state.productsList
		// 	.slice(-1)
		// 	.map((product, index) => {
		// 		return product = this.state.productsList[this.state.productsList.length - 1].images[0]
		// 	})
		// console.log(this.state.lastProduct)
		return 'hola'
	}

	render() {
		return (
			<React.Fragment>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
					</div>

					{/*<!-- Content Row Movies-->*/}
					<ContentRowMovies
						productsTotal={this.state.productsTotal}
						categoriesTotal={this.state.categoriesTotal}
						usersTotal={this.state.usersTotal}
					/>
					{/*<!-- End movies in Data Base -->*/}


					{/*<!-- Content Row Last Movie in Data Base -->*/}
					<div className="row">
						{/*<!-- Last Movie in DB -->*/}
						<div className="col-lg-6 mb-4">
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h5 className="m-0 font-weight-bold text-gray-800">
										{this.state.productsList
											.slice(-1)
											.map((product, index) => {
												return <p>{product = this.state.productsList[this.state.productsList.length - 1].name}</p>
											})

										}
									</h5>
								</div>
								<div className="card-body">
									<div className="text-center">
										{/* <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem' }} src={imagenFondo} alt=" Star Wars - Mandalorian " /> */}
										<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 40 + 'rem' }} src={`http://localhost:3002/img/${this.state.lastProduct}`} alt=" Star Wars - Mandalorian " />
									</div>
									<p>
										{this.state.productsList
											.slice(-1)
											.map((product, index) => {
												return <p>{product = this.state.productsList[this.state.productsList.length - 1].description}</p>
											})
										}
									</p>
									<a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>
								</div>
							</div>
						</div>
						{/*<!-- End content row last movie in Data Base -->*/}

						{/*<!-- Categories in DB -->*/}
						<CategoriesInDb categoriesList={this.state.categoriesList} />

						{/*<!--End Categories In Db-->*/}
					</div>
				</div>
				{/*<!--End Content Row Top-->*/}

			</React.Fragment>
		)

	}
}

export default ContentRowTop;