import React from 'react'
import Part from './Part'
import  { CoursePart }  from '../App'


function Content({courseParts}: {courseParts: CoursePart[]}) {
    return (
        <Part courseParts={courseParts} />
    )
}

export default Content
