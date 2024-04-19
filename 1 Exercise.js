function calculateAverage() {  
    // Prompt the user to enter their full name.My name is Colin Gu Xiaokang,NCC ID is 173190707.
    let studentName = prompt("Please enter your full name:");  
  
    // Initialize an empty array to store the grades  
    let grades = [];  
  
    // Initialize a variable to keep track of the sum of grades  
    let sum = 0;  
  
    // Set the number of units/courses for which grades will be entered  
    const unitCount = 4;  
  
    // Loop through each unit/course to collect the grades  
    for (let i = 1; i <= unitCount; i++) {  
        let gradeInput;  
  
        // Prompt the user to enter the grade for the current unit/course  
        // and continue prompting until a valid grade is entered  
        do {  
            gradeInput = prompt(`Please enter the grade for Unit ${i} (0-100):`);  
        } while (!isValidGrade(gradeInput));  
  
        // Parse the grade input to a floating-point number  
        const grade = parseFloat(gradeInput);  
  
        // Add the grade to the grades array  
        grades.push(grade);  
  
        // Add the grade to the sum  
        sum += grade;  
    }  
  
    // Calculate the average grade by dividing the sum by the number of units/courses  
    const average = sum / unitCount;  
  
    // Log the student's name to the console  
    console.log(`Student Name: ${studentName}`);  
  
    // Log the total score (sum of grades) to the console  
    console.log(`Total Score: ${sum}`);  
  
    // Log the average score to the console, formatted to two decimal places  
    console.log(`Average Score: ${average.toFixed(2)}`);  
  
    // Thank the user for using the program  
    console.log("Thank you for using this program");  
}