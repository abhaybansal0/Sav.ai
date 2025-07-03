import Subject from '../models/subject.js'
import Progress from '../models/progress.js';

const getSubjects = async (req, res) => {

    try {

        const Subjects = await Subject.find();

        const userId = req.user._id;

        const userProgress = await Progress.findOne({
            user: userId
        })
        console.log(userProgress);

        res.status(200).send({
            message: 'Subjects successfully retrived',
            success: true,
            Subjects
        })


    } catch (error) {
        console.log('Error in fetching Subjects:', error);
        res.status(500).send({
            message: 'Server Error, Please try again later',
            success: false
        })
    }
}

const getDashCourses = async (req, res) => {
    try {
        const userId = req.user._id
        const StartedSubs = await Progress.find({ user: userId }).populate('subject').exec();

        // console.log(StartedSubs);
        const CoursesArray = [];

        for (const cors of StartedSubs) {

            const subObj = cors.subject.toObject();
            subObj.NoOfUnitsDone = cors.units.length;

            CoursesArray.push(subObj);
        }

        if (CoursesArray.length <= 2) {
            const NewSubs = await Subject.find();

            for (const newCors of NewSubs) {
                if (CoursesArray[0]?._id.toString() === newCors._id.toString()) continue;
                if (CoursesArray[1]?._id.toString() === newCors._id.toString()) continue;

                const subObj = newCors.toObject();
                subObj.NoOfUnitsDone = 0;

                CoursesArray.push(subObj);
            }
        }

        res.status(200).json({
            message: 'Courses fetched Successfully!',
            success: true,
            CoursesArray
        })

    } catch (error) {
        console.log('Error in fetching Subjects:', error);
        res.status(500).send({
            message: 'Server Error, Please try again later',
            success: false
        })
    }
}


const addSubject = async (req, res) => {

    try {
        const subject = req.body;

        if (!subject?.name) {
            return res.status(400).send({
                message: 'Missing required fields!',
                success: false
            })
        }

        const newSubject = new Subject(subject);
        await newSubject.save();

        res.status(201).send({
            message: 'Successfully cretead a new Subject',
            success: true,
            newSubject
        })



    } catch (error) {
        console.log('Error in making the Subject:', error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'A subject with this name already exists'
            });
        }

        res.status(500).send({
            message: 'Server Error, Please try again later',
            success: false
        })
    }
}


export {
    getSubjects,
    addSubject,
    getDashCourses
}