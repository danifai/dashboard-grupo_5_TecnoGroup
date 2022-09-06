import React from 'react';

import MovieList from './MovieList';

class Movie extends React.Component {
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
		this.btnDecrementClick = this.btnDecrementClick.bind(this);
		this.btnIncrementClick = this.btnIncrementClick.bind(this);
		this.btnNextClick = this.btnNextClick.bind(this);
		this.btnPrevClick = this.btnPrevClick.bind(this);
		this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
	}
	state = {
		productsList: [],
		currentPage: 1,
		allPerPage: 5,
		upperPageBound: 5,
		lowerPageBound: 0,
		isPrevBtnActive: 'disabled',
		isNextBtnActive: '',
		pageBound: 5
	}

	handleClick(event) {
		let listid = Number(event.target.id);
		this.setState({
			currentPage: listid
		});
		this.setPrevAndNextBtnClass(listid);
	}
	setPrevAndNextBtnClass(listid) {
		let totalPage = Math.ceil(this.state.productsList.length / this.state.allPerPage);
		this.setState({isNextBtnActive: 'disabled'});
		this.setState({isPrevBtnActive: 'disabled'});
		if(totalPage === listid && totalPage > 1){
			this.setState({isPrevBtnActive: ''});
		}
		else if(listid === 1 && totalPage > 1){
			this.setState({isNextBtnActive: ''});
		}
		else if(totalPage > 1){
			this.setState({isNextBtnActive: ''});
			this.setState({isPrevBtnActive: ''});
		}
	}
	btnIncrementClick() {
		this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
		this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
		let listid = this.state.upperPageBound + 1;
		this.setState({ currentPage: listid});
		this.setPrevAndNextBtnClass(listid);
	}
	btnDecrementClick() {
		this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
		this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
		let listid = this.state.upperPageBound - this.state.pageBound;
		this.setState({ currentPage: listid});
		this.setPrevAndNextBtnClass(listid);
	}
	btnPrevClick() {
		if((this.state.currentPage -1)%this.state.pageBound === 0 ){
			this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
			this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
		}
		let listid = this.state.currentPage - 1;
		this.setState({ currentPage : listid});
		this.setPrevAndNextBtnClass(listid);
	}
	btnNextClick() {
		if((this.state.currentPage +1) > this.state.upperPageBound ){
			this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
			this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
		}
		let listid = this.state.currentPage + 1;
		this.setState({ currentPage : listid});
		this.setPrevAndNextBtnClass(listid);
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
		const { productsList, currentPage, allPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive } = this.state;
		const indexOfLastTodo = currentPage * allPerPage;
		const indexOfFirstTodo = indexOfLastTodo - allPerPage;
		const currentAll = productsList.slice(indexOfFirstTodo, indexOfLastTodo);
		const renderAll = currentAll.map((product, index) => {
			return <tr key={index.toString()}>
				<td>{product.id}</td>
				<td>{product.name}</td>
				<td>{product.description}</td>
			</tr>
		});

		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(productsList.length / allPerPage); i++) {
			pageNumbers.push(i);
		}

		const renderPageNumbers = pageNumbers.map(number => {
			if((number === 1 && currentPage === 1) || currentPage === number){
				return(
					<li key={number} className='page-item active' id={number}><span id={number} onClick={this.handleClick} className='page-link'>{number}</span></li>
				)
			}
			else if((number < upperPageBound + 1) && number > lowerPageBound){
				return(
					<li key={number} id={number} className='page-item'><span id={number} onClick={this.handleClick} className='page-link'>{number}</span></li>
				)
			}
		});
		let pageIncrementBtn = null;
		if(pageNumbers.length > upperPageBound){
			pageIncrementBtn = <li className='page-item'><span onClick={this.btnIncrementClick} className='page-link'> &hellip; </span></li>
		}
		let pageDecrementBtn = null;
		if(lowerPageBound >= 1){
			pageDecrementBtn = <li className='page-item'><span onClick={this.btnDecrementClick} className='page-link'> &hellip; </span></li>
		}
		let renderPrevBtn = null;
		if(isPrevBtnActive === 'disabled') {
			renderPrevBtn = <li className='page-item {isPrevBtnActive}'><span id="btnPrev" className='page-link'> Prev </span></li>
		}
		else{
			renderPrevBtn = <li className='page-item {isPrevBtnActive}'><span id="btnPrev" onClick={this.btnPrevClick} className='page-link'> Prev </span></li>
		}
		let renderNextBtn = null;
		if(isNextBtnActive === 'disabled') {
			renderNextBtn = <li className='page-item {isNextBtnActive}'><span id="btnNext" className='page-link'> Next </span></li>
		}
		else{
			renderNextBtn = <li className='page-item {isNextBtnActive}'><span id="btnNext" onClick={this.btnNextClick} className='page-link'> Next </span></li>
		}

		return (<React.Fragment>
			{/*<!-- PRODUCTS LIST -->*/}
			<h1 className="h3 mb-2 text-gray-800">All products in the Database</h1>
			{/*<!-- DataTales Example -->*/}
			<div className="card shadow mb-4">
				<div className="card-body">
					<div className="table-responsive">
						<div>
							<nav aria-label="Page navigation">
								<ul className="pagination  justify-content-end">
									{renderPrevBtn}
									{pageDecrementBtn}
									{renderPageNumbers}
									{pageIncrementBtn}
									{renderNextBtn}
								</ul>
							</nav>
						</div>
						<table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
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
								{renderAll}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</React.Fragment>)
	}
}

export default Movie;