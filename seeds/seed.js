const sequelize = require(`../config/connection`);
const { User, Drawing, Answer } = require(`../models`);

const userData = [{
        username: `Logan`,
        password: `123456789`,
        email: `logan@gmail.com`,
        highcore: 0
    },
    {
        username: `Maria`,
        password: `123456789`,
        email: `maria@gmail.com`,
        highscore: 0
    },
    {
        username: `Thom`,
        password: `123456789`,
        email: `thom@gmail.com`,
        highscore: 0
    }, {
        username: `Vinit`,
        password: `123456789`,
        email: `vinit@gmail.com`,
        highscore: 0
    }
]

const answerData = [{
        word: `Loonie`
    }, {
        word: `Toonie`,
    },
    {
        word: `Double Double`,
    },
    {
        word: `Poutine`,
    },
    {
        word: `Timmies`,
    },
    {
        word: `Chesterfield`,
    },
    {
        word: `Mountie`,
    },
    {
        word: `Nanaimo bar`,
    },
    {
        word: `Caeser`,
    },
    {
        word: `Parka`,
    },
    {
        word: `hydro`,
    },
    {
        word: `Tuque`,
    },
    {
        word: `Toronto`,
    }, {
        word: `Snow`,
    },
    {
        word: `Thunder Storm`,
    },
    {
        word: `Rogers`,
    },
    {
        word: `Maple Syrup`,
    },
    {
        word: `Ice hockey`,
    },
    {
        word: `Niagara Falls`,
    },
    {
        word: `CN Tower`,
    },
    {
        word: `Vancouver`,
    },
    {
        word: `Canadians`,
    },
    {
        word: `Tim Hortons`,
    },
    {
        word: `Trudeau`,
    },
    {
        word: `Polar Bears`,
    },
    {
        word: `Eh`,
    },
    {
        word: `Timbits`,
    },
    {
        word: `Donair`,
    },
    {
        word: `Hudson Bay`,
    },
    {
        word: `Toronto Raptors`,
    },
    {
        word: `Smarties`,
    },
    {
        word: `Beaver`,
    },
    {
        word: `Curling`,
    },
    {
        word: `Lacrosse`,
    },
    {
        word: `Pop`,
    },
    {
        word: `Garburator`,
    },
    {
        word: `Peameal bacon`,
    },
    {
        word: `Ketchup Chips`,
    },
    {
        word: `Butter Tarts`,
    },
    {
        word: `Justin Bieber`,
    }
]

const drawingData = [{
        filename: "test1.svg",
    },
    {
        filename: "test2.svg",
    },
    {
        filename: "test3.svg",
    },
    {
        filename: "test4.svg",
    }
]

const seedData = async() => {
    await sequelize.sync({ force: true });

    const dbUsers = await User.bulkCreate(userData, {
        individualHooks: true
    });
    console.table(dbUsers.map(User => User.toJSON()));

    const dbAnswer = await Answer.bulkCreate(answerData);
    console.table(dbAnswer.map(Answer => Answer.toJSON()));

    const dbDrawing = await Drawing.bulkCreate(drawingData);
    console.table(dbDrawing.map(Drawing => Drawing.toJSON()));

    // await dbUsers[0].addDrawing
    process.exit(0);
}

seedData();