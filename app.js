//Listen for calculate event
document.getElementById('loan-form').addEventListener('submit', function(e){
    //hide results
    document.getElementById('results').style.display = 'none';

    //show loader
    document.getElementById("loading").style.display = 'block';

    setTimeout(calculateResults, 1500);
    e.preventDefault();
});

//Calculate results function
function calculateResults(e) {
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Compute EMI
    const a = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * a * calculatedInterest)/(a-1);
    
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        //show results
        document.getElementById('results').style.display = 'block'; 
        //hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your inputs!');
    }

    e.preventDefault();
}

//Show error function
function showError(error){

    //hide results
    document.getElementById('results').style.display = 'none'; 
    //hide loader
    document.getElementById('loading').style.display = 'none';

    //create a div
    const errorDiv = document.createElement('div');
    //get required elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className = 'alert alert-danger'; //add respective class name
    errorDiv.appendChild(document.createTextNode(error)); //create text node and append

    card.insertBefore(errorDiv, heading); //insert error box above heading

    setTimeout(clearError, 4000); //clear the error msg after 5 secs
}

function clearError(){
    document.querySelector('.alert').remove();
}