import './App.css';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [
                {id: '1', name: 'Apple', price: 2},
                {id: '2', name: 'Banana', price: 1},
                {id: '3', name: 'Chokeberry', price: 5},
                {id: '4', name: 'Raspberry', price: 4},
                {id: '5', name: 'Strawberry', price: 3},
                {id: '6', name: 'Blackberry', price: 4},
                {id: '7', name: 'Mango', price: 6},
                {id: '8', name: 'Orange', price: 2},
                {id: '9', name: 'Kiwi', price: 1},
                {id: '10', name: 'Lemon', price: 2},
                {id: '11', name: 'Melon', price: 3},
                {id: '12', name: 'Peach', price: 2},
                {id: '13', name: 'Fig tree', price: 3},
                {id: '14', name: 'Pear', price: 2},
                {id: '15', name: 'Blueberry', price: 5},
            ],
            allProducts: [
                {id: '1', name: 'Apple', price: 2},
                {id: '2', name: 'Banana', price: 1},
                {id: '3', name: 'Chokeberry', price: 5},
                {id: '4', name: 'Raspberry', price: 4},
                {id: '5', name: 'Strawberry', price: 3},
                {id: '6', name: 'Blackberry', price: 4},
                {id: '7', name: 'Mango', price: 6},
                {id: '8', name: 'Orange', price: 2},
                {id: '9', name: 'Kiwi', price: 1},
                {id: '10', name: 'Lemon', price: 2},
                {id: '11', name: 'Melon', price: 3},
                {id: '12', name: 'Peach', price: 2},
                {id: '13', name: 'Fig tree', price: 3},
                {id: '14', name: 'Pear', price: 2},
                {id: '15', name: 'Blueberry', price: 5},
            ],
            cart: JSON.parse(localStorage.getItem('sessionCartValue')) || [],
            total: 0,
            searchText: '',
        };

        let sum = 0;
        for (let i = 0; i < this.state.cart.length; i++) {
            sum += this.state.cart[i].count * this.state.cart[i].price;
        }
        this.state.total = sum;

        this.addToCart = this.addToCart.bind(this);
        this.remove = this.remove.bind(this);
        this.decreaseCount = this.decreaseCount.bind(this);
        this.increaseCount = this.increaseCount.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.search = this.search.bind(this);
    }

    addToCart(product) {
        let tmpCart = this.state.cart;
        this.setState({total: this.state.total + product.price});

        if (tmpCart.some((el) => el.id === product.id)) {
            const index = tmpCart.findIndex((el) => el.id === product.id);
            tmpCart[index].count++;
            this.setState({cart: tmpCart});
        } else {
            let cartEl = product;
            cartEl.count = 1;
            cartEl.id = cartEl.id;
            tmpCart.push(cartEl);
            this.setState({cart: tmpCart});
        }

        localStorage.setItem('sessionCartValue', JSON.stringify(tmpCart));
    }

    decreaseCount(index) {
        let tmpCart = this.state.cart;
        if (tmpCart[index].count === 1) {
            return;
        }

        tmpCart[index].count--;
        this.setState({cart: tmpCart});
        this.setState({total: this.state.total - this.state.cart[index].price});

        localStorage.setItem('sessionCartValue', JSON.stringify(tmpCart));
    }

    increaseCount(index) {
        let tmpCart = this.state.cart;
        tmpCart[index].count++;
        this.setState({cart: tmpCart});
        this.setState({total: this.state.total + tmpCart[index].price});

        localStorage.setItem('sessionCartValue', JSON.stringify(tmpCart));
    }

    remove(index) {
        this.setState({
            total:
                this.state.total -
                this.state.cart[index].count * this.state.cart[index].price,
        });
        let tmpCart = this.state.cart;
        tmpCart.splice(index, 1);
        this.setState({cart: tmpCart});

        localStorage.setItem('sessionCartValue', JSON.stringify(tmpCart));
    }

    removeAll() {
        this.setState({cart: []});
        this.setState({total: 0});

        localStorage.setItem('sessionCartValue', JSON.stringify([]));
    }

    search({target}) {
        if (target.value === '') {
            this.setState({products: this.state.allProducts});
        } else {
            let tmpProducts = [];
            for (let i = 0; i < this.state.allProducts.length; i++) {
                if (
                    this.state.allProducts[i].name
                        .toLocaleLowerCase()
                        .includes(target.value.toLocaleLowerCase())
                ) {
                    tmpProducts.push(this.state.allProducts[i]);
                }
            }
            this.setState({products: tmpProducts});
        }
    }

    render() {
        return (
            <>
                <div className="container-lg mt-5">
                    <div className="row">
                        <div className="col-lg-6 col-sm-11 mt-5 table-responsive">
                            <div className="row">
                                <div className="col-md-4 p-0">
                                    <input
                                        type="text"
                                        className="form-control m-1"
                                        placeholder="Search"
                                        onChange={this.search}
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <table className="table table-dark table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col">Fruits</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.products.map((product) => (
                                            <tr key="{product.id}">
                                                <td>{product.name}</td>
                                                <td>{product.price} $</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() =>
                                                            this.addToCart(
                                                                product,
                                                            )
                                                        }>
                                                        Add to cart
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-lg-5 col-sm-12">
                            <div className="row justify-content-end">
                                <p className="text-end">
                                    <button
                                        className="btn btn-success"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseExample"
                                        aria-expanded="false"
                                        aria-controls="collapseExample">
                                        Cart
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-cart-fill"
                                            viewBox="0 0 16 16">
                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </svg>
                                    </button>
                                </p>
                                <div className="collapse" id="collapseExample">
                                    <div className="card card-body table-responsive">
                                        <p className="text-end">
                                            <button
                                                className="btn btn-danger"
                                                onClick={this.removeAll}>
                                                Remove all
                                            </button>
                                        </p>
                                        <table className="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.cart.map(
                                                    (cartEl, index) => (
                                                        <tr
                                                            key="{cartEl.id}"
                                                            className="align-middle">
                                                            <td>
                                                                {cartEl.name}
                                                            </td>
                                                            <td>
                                                                {cartEl.price}$
                                                                x {cartEl.count}
                                                            </td>
                                                            <td className="text-end">
                                                                <button
                                                                    className="btn btn-secondary"
                                                                    onClick={() =>
                                                                        this.decreaseCount(
                                                                            index,
                                                                        )
                                                                    }>
                                                                    -
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-secondary"
                                                                    onClick={() =>
                                                                        this.increaseCount(
                                                                            index,
                                                                        )
                                                                    }>
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td className="text-end">
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() =>
                                                                        this.remove(
                                                                            index,
                                                                        )
                                                                    }>
                                                                    Remove
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ),
                                                )}
                                                <tr className="table-secondary text-end">
                                                    <td colSpan="5">
                                                        Total:{' '}
                                                        {this.state.total}$
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default App;
