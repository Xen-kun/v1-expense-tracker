const ExpenseItem = ({ expense }) => {
    return (
        <div className="expense-item"> 
            <div> 
                <h3>{expense.title}</h3> 
                <p>{expense.category}</p> 
                <p>{expense.date}</p> 
            </div>
            <strong>₱{Number(expense.amount).toFixed(2)}</strong>

            <div className="expense-actions">
                <button onClick={() => console.log("Edit", expense.id)} className="edit-button">
                    Edit
                </button>
            </div>

            <button onClick={() => console.log("Delete:", expense.id)} className="delete-button">
                Delete
            </button>
        </div>
    );
};

export default ExpenseItem;

