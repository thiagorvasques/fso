/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises} from "./exerciseCalculator";


const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello fullstack");
});

app.get("/bmi", (req, res) => {
    const query = req.query;

    if (!query.height || !query.weight) {
        res.status(400).json({error: "malformatted parameters"});
    }


    const response = {
        height: query.height,
        weight: query.weight,
        bmi: calculateBmi(Number(query.height), Number(query.weight))
    };


    res.json(response);
});


app.post("/calculator", (req, res) => {

    const body: any = req.body;

    console.log("typeof daily =", typeof body.daily_exercises, "typeof target=", typeof body.target);

    if(!body.daily_exercises || !body.target){
        res.status(400).json({error: "parameters missing"});

    }
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       if (typeof body.target === "string" || body.daily_exercises.some((h: any) => typeof h === "string"))  {

        res.status(400).json({error: "malformatted parameters"});
    }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const response = calculateExercises(body.daily_exercises, body.target);
        res.send(response);







});




const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);

});