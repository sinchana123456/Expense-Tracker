import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import Button from '../UI/Button';
import classes from './Expense.module.css';

const Expense = (props) => {
    const expenseRef = useRef(null);
    const descriptionRef = useRef('');
    const categoryRef = useRef('');
    const [expenses, setExpenses] = useState([]);
    
    useEffect(() => {
        const res = axios.get(
            'https://expense-tracker-9a6ab-default-rtdb.firebaseio.com/expense.json'
            ).then((res) => {
                console.log(res.data);
                const retrivedObjValues = Object.values(res.data);
                console.log(retrivedObjValues);
                setExpenses(retrivedObjValues);
            }).catch((err) => {
                console.log(err);
            })
    }, []);

const submitHandler = async(event) => {
    event.preventDefault();

    const enteredExpense = expenseRef.current.value;
    const enteredDescription = descriptionRef.current.value;
    const enteredCategory = categoryRef.current.value;

    const expenseObj = {
        amount: enteredExpense,
        description: enteredDescription,
        category: enteredCategory
    };

    try {
        const res = await axios.post('https://expense-tracker-9a6ab-default-rtdb.firebaseio.com/expense.json',
        expenseObj );
        console.log(res);
        setExpenses( [...expenses, expenseObj] );
        
    } catch (err) {
        console.log(err);
    }
    
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
                })};            
            </div>
        </Fragment>
    );

};

export default Expense;