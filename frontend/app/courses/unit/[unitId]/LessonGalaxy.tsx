import '../../[courseId]/galaxyClasses.css'
import React from 'react'

interface Props {
    theme: 'Yellow' | 'Brown' | 'Blue' | 'Green' | 'Orange' | 'Red' | 'Cyan' | 'Teal' | 'Pink' | 'Purple' | 'Gray'
}

const LessonGalaxy = ({ theme }: Props) => {
    return (
        <div className='relative'>

            <div className="galaxy cursor-pointer !scale-110 md:!scale-75">
                <div className="galaxyRing ring1"></div>
                <div className="galaxyRing ring2"></div>
                <div className="galaxyRing ring3"></div>
                <div className="galaxyRing ring4"></div>
                <div className={`galaxyCenter center-${theme}`}></div>
            </div>

        </div>
    )
}

export default LessonGalaxy
