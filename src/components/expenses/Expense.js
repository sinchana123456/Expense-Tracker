import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import Button from '../UI/Button';
import { BiRupee } from 'react-icons/bi';
import classes from './Expense.module.css';

const Expense = () => {
    const expenseRef = useRef(null);
    const descriptionRef = useRef('');
    const categoryRef = useRef('');
    const [expenses, setExpenses] = useState([]);
    const [isHover, setIsHover] = useState(false);
    
    const getExpenseData = () => {
        axios.get(
            'https://expense-tracker-9a6ab-default-rtdb.firebaseio.com/expense.json'
            ).then((res) => {
                console.log(res.data);
                setExpenses(res.data);
            }).catch((err) => {
                console.log(err);
            })
    };

    useEffect( getExpenseData , []);

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
            setExpenses( {...expenses, expenseObj} );
            
        } catch (err) {
            console.log(err);
        }
    };

    const deleteExpenseHandler = (expenseId) => {
        axios.delete(
            `https://expense-tracker-9a6ab-default-rtdb.firebaseio.com/expense/${expenseId}.json`
        ).then((res) => {
            console.log(res);
           getExpenseData();
        }).catch((err) => {
            console.log(err);
        })
    };

    const editExpenseHandler = (expenseId) => {
        expenseRef.current.value = expenses[expenseId].amount;
        descriptionRef.current.value = expenses[expenseId].description;
        categoryRef.current.value = expenses[expenseId].category;
        deleteExpenseHandler(expenseId);
    };

    const mouseEnter = () => {
        setIsHover(true)
    };

    const mouseLeave = () => {
        setIsHover(false)
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
                    <option></option>
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
                <ul>
                    {Object.keys(expenses).map((expense) => {
                    return (
                            <li key={expense}>
                                <span style={{fontWeight: 'bold'}}><BiRupee />
                                    {expenses[expense].amount}  
                                </span>
                                <span> for ( {expenses[expense].description}) </span>
                                <span>  { expenses[expense].category }  </span>
                                <span>
                                    <button  
                                        style={{
                                            backgroundColor: isHover ? 'green': '',
                                            color: isHover ? 'white' : ''
                                        }} 
                                        onMouseEnter={mouseEnter}
                                        onMouseLeave={mouseLeave}
                                        onClick={() => editExpenseHandler(expense)}>Edit
                                    </button>
                                    <button
                                        style={{
                                            backgroundColor: isHover ? 'red': '',
                                            color: isHover ? 'white' : ''
                                        }} 
                                        onMouseEnter={mouseEnter}
                                        onMouseLeave={mouseLeave} 
                                        onClick={() => deleteExpenseHandler(expense)}>Delete
                                    </button>
                                </span>
                            </li>
                        )
                    })};   
                </ul>
            </div>
        </Fragment>
    );

};

export default Expense;