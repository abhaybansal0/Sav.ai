import Subject from '../models/subject.js'
import Progress from '../models/progress.js';

const bl = {
    // title: "Python for Data Science",
    // description: "Comprehensive introduction to Python programming for data analysis and visualization",
    // level: "Intermediate" as const,
    // units: 20,
    // icon: <BookOpen className="w-6 h-6 text-white" />,
    // rating: 4.7,
    // students: 12300,
    // duration: "8 weeks",
    // gradientColors: "from-green-400 via-blue-500 to-purple-600",

    progress: 42,
    isStarted: true
}

const getSubjects = async (req, res) => {

    try {

        const Subjects = await Subject.find().sort('__v').lean();

        const userId = req.user._id;

        const userProgress = await Progress.find({
            user: userId
        }).lean();

        const ProgressMap = new Map();

        for (const obj of userProgress) {
            // let xpGained = 0;
            let lessonsCompleted = 0;
            for (const unit of obj.units) {
                lessonsCompleted += unit.lessonsCompleted.length;
                // xpGained += unit.xpGained;
            }
            ProgressMap.set(obj.subject.toString(), lessonsCompleted);
        }

        for(const sub of Subjects) {
            const subId = sub._id.toString();
            const completedLessons = ProgressMap.get(subId) || 0;
            const running = completedLessons===0 ? false : true;


            sub.progress = completedLessons;
            sub.isStarted = running;

            delete sub.updatedAt;
            delete sub.__v;

        }


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