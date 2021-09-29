import React from 'react';

interface course {
    name: string;
    exerciseCount: number;
}

function Total({courseParts}: {courseParts: course[]}) {
    return (
        <div>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    )
}

export default Total
