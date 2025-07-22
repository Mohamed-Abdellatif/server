import { announcementModel } from "../models/announcementModel";
import QuizModel from "../models/quizModel";

export const seedInitialAnnouncements = async () => {
  const announcements = [
    {
      name: "Mr.Ahmed Mostafa",
      subject: "Math 101",
      avatar: "A",
      message:
        "Hi my hero! I just want you ready to our exams and focus on remaining assessments to gain more grades, good luck my warriors! 😊",
    },
    {
      name: "Mrs.Salma Ahmed",
      subject: "Physics 02",
      avatar: "S",
      message:
        "Hello my students, I want to announce that the next quiz will be within 3 days and will cover the whole unit2. Add and subtract numbers. Study hard! Good luck! 💪",
    },
    {
      name: "School management",
      subject: "Management",
      avatar: "M",
      message:
        "We appreciate your outstanding learning! What really made my day is the flag call I had earlier this morning to 850 students at Goodwyn Junior High School in Tagamo3, Egypt. I just want to convey to all our super students to focus on remaining assessments to gain more grades, good luck my superstars!",
    },
    {
      name: "Events Manager",
      subject: "Events",
      avatar: "E",
      message:
        "Hello! Can’t wait for our upcoming trip on the next weekend. The trip will be to Dreampark and Pyramids. To book your seat please contact your class teacher.",
    },
  ];

  await announcementModel.insertMany(announcements);
};

export const seedInitialQuizzes = async () => {
  const quizzes = [
    {
      type: "Unit 2 quiz",
      course: "Physics 02",
      details: "Unit2: Unbalanced forces",
      due: "30 Dec 2017 - 09:00 PM",
      action: "Start Quiz",
    },
    {
      type: "12-12 Assignment",
      course: "Arabic K12",
      details: "Unit2: Unbalanced forces",
      due: "30 Dec 2017 - 09:00 PM",
      action: "Solve Assignment",
    },
  ];

  await QuizModel.insertMany(quizzes);
};
