import { Fragment, useRef, useState } from 'react';
import Button from '../UI/Button';
import classes from './Expense.module.css';

const Expense = (props) => {
    const expenseRef = useRef(null);
    const descriptionRef = useRef('');
    const categoryRef = useRef('');
    const [expenses, setExpenses] = useState([]);

const submitHandler = (event) => {
    event.preventDefault();

    const enteredExpense = expenseRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;

    const expenseObj = {
        amount: enteredExpense,
        description: enteredDescription,
        category: enteredCategory
    };
    setExpenses( [...expenses, expenseObj] );
};

    return (
        <Fragment>
            <form className={classes.expense}onSubmit={submitHandler}>
                <h1>Add New Expense</h1>
                <input
                    name='expense'
                    type='number'
                    placeholder='Enter your Expense'
                    ref={expenseRef}
                    required
                />
                <input
                    name='description'
                    type='description'
                    placeholder='Description'
                    ref={descriptionRef}
                    required
                />
                <select
                    placeholder='Category'
                    ref={categoryRef}
                    required >
                    <option>Food</option>
                    <option>Petrol</option>
                    <option>Movie</option>
                    <option>Vacation</option>
                    <option>Shopping</option>
                    <option>Others</option>
                    </select>
                <Button>Add Expense</Button>
            </form>
            <div className={classes.list}>
                {expenses.map((expense) => {
                    return (
                        <ul>
                            <li>
                                <span>Rupees {expense.amount}  </span>
                                <span> for ( {expense.description} ) </span>
                                <span>  {expense.category}</span>
                                <hr />
                            </li>
                        </ul>
                    )
                })}            
            </div>
        </Fragment>
    )

};

export default Expense;