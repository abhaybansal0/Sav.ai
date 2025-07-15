'use client'
import React from 'react'
import toast from 'react-hot-toast';

const DailyChallange = async () => {
    toast('Coming Soon');
}

const HudBtn = ({ mode }: { mode: 'daily' | 'continue' }) => {

    if (mode === 'daily') {
        return (
            <button
                onClick={DailyChallange}
                className='py-2 px-4 border rounded-md border-orange-300 text-orange-600 hover:bg-orange-50
                        font-semibold hover:text-black
                    '>
                Daily challange
            </button>
        )
    }

    return (
        <button
            // onClick={}
            className='px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 
                        text-white font-semibold
                    border-none'>
            Continue Learning
        </button>
    )
}

export default HudBtn
