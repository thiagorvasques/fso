interface ExerciseResult {
    periodLenght: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ArgumentResult {
    daily_exercises: Array<number>;
    target: number
}

// const handleArguments = (args: Array<string>): ArgumentResult => {
//     console.log("arguments =", args);

//      if (args.length < 4) throw new Error("not enough arguments");
//     const target = Number(args[2]);
//     console.log("target =", target);

//     const sliced = args.slice(3);
//     console.log("sliced =", sliced, typeof sliced);
//    const array = sliced.map(Number);
//    console.log(array);


//     return {
//         arr: array,
//         target: target
//     };


// };

const calculateExercises = (args: Array<number>, target: number): ExerciseResult => {
    const periodLenght = args.length;
    const trainingDays = args.filter((h) => h !== 0).length;
    const average = args.reduce((a, b) => a + b) / args.length;
    const success = average >= target ? true : false;
    const rating = Math.round(average);
    let ratingDesc = "";
    if (rating === target) {
        ratingDesc = "Not bad, there's room for improvement";
    } else if (rating < target) {
        ratingDesc = "Bellow target, you need to work harder";
    } else if (rating > target) {
        ratingDesc = "Well done! keep the good job";
    }

    return {
        periodLenght: periodLenght,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDesc,
        target: target,
        average: average

    };
};

// try {
//     const { arr, target } = handleArguments(process.argv);
//     console.log(calculateExercises(arr, target));
// } catch (e) {
//     console.log(e);

// }
//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

export {calculateExercises, ArgumentResult };