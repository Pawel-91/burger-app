import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerActions from '../../store/actions/index';
import axios from '../../axios-orders';

export class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
       this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
        .map((igKey) => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }

    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }    

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;

       
        let burger = this.props.error ? <p style={{textAlign: "center"}}> Ingredients can't be loaded!</p>
            : <Spinner />;
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchaseable={!this.updatePurchaseState(this.props.ings)}
                        price ={this.props.totalPrice}
                        order={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            cancel = {this.purchaseCancelHandler}
            continue = {this.purchaseContinueHandler}
            price = {this.props.totalPrice}/>
        }
        
        if(this.state.loading) {
            orderSummary = <Spinner />
        }   

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
               {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        ingredients: state.burgerBuilder.ingredients,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));