exports.calculator = async (req, res) => {
    console.log("script connected")
    try {
    const form    = document.getElementById('calForm');
    const results = document.getElementById('results');
    const errors  = document.getElementById('form-error');


    function displayResult(calories){
        results.innerHtml = `hello ${calories}`
    }

    function submitHandler(){
        let age = form.age.value
        if(isNaN(age) || age < 0) {
            return errorMessage('Please enter a valid age');
        }

        let height = form.height.value
        if(isNaN(height) || height < 0) {
            return errorMessage('Please enter a valid height');
        }

        let weight = form.weight.value
        if(isNaN(weight) || weight < 0) {
            return errorMessage('Please enter a valid weight');
        }  

        let calories = 0;
        if(form.gender.value == 'Female') {
            //females  
        calories = 655.09 + (9.56 * weight) + (1.84 * height) - (4.67 * age);
        }  else {
            //males
        calories = 66.47 + (13.75 * weight) + (5 * height) - (6.75 * age);
        }

        displayResult(calories)
    }
    form.addEventListener('submit', submitHandler);
    results.addEventListener('click', resetForm, true);
} catch (e) {
    if (e.errors){
        results.innerHtml = `error: ${e}`
    }
}
}