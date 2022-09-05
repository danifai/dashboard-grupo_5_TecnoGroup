import React from 'react';
import Category from './Category';

class CategoriesInDb extends React.Component {
    state = {
        overOnH6: false
    }

    handleMouseOver = () => {
        this.setState({
            overOnH6: (!this.state.overOnH6)
        })
    }
    
    render(){
        return(
            <React.Fragment>
            {/*<!-- Categories in DB -->*/}
            <div className="col-lg-6 mb-4">						
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 onClick={this.handleMouseOver} className="m-0 font-weight-bold text-gray-800">Categories in Data Base</h6>
                    </div>
                    <div className={`card-body ${this.state.overOnH6 && 'bg-secondary'}`}>
                        <div className="row">
                            {
                                this.props.categoriesList.map((category,index)=>{
                                    return  <Category  category = {category.category_name}  key={index} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
       
    </React.Fragment>
        );
    }
}

export default CategoriesInDb;