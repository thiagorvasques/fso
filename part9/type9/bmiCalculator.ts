// interface BmiValues {
//     value1: number;
//     value2: number;
// }

// const argumentsFn = (args: Array<string>): BmiValues=> {
//     if (args.length > 4) throw new Error("Too many arguments");
//     if (args.length < 4) throw new Error("Not enough arguments");

//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             value1: Number(args[2]),
//             value2: Number(args[3])
//         };
//     } else {
//         throw new Error("Arguments must be numbers");
//     }
// };


const calculateBmi = (height: number, weight: number):string => {
    const result = Number((weight / ((height * height)/ 10000)).toFixed(2));
    console.log(result);

    if (result < 18.5) {
        return `Underweight (Unhealthy)`;
    } else if (result >= 18.5 && result < 25) {
        return `Normal (Healthy)`;
    } else if (result >= 25 && result < 30) {
        return `Overweight (Moderetely obese)`;
    } else if (result >= 30) {
        return `Obesity (Severely obese)`;
    } else {
        return "error";
    }
};



// try {
//     const { value1, value2 } = argumentsFn(process.argv);
//     console.log(calculateBmi(value1, value2));
// } catch (e) {
//     console.log(e);

// }


export { calculateBmi };