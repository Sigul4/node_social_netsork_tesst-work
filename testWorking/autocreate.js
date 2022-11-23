module.exports = async function createModel(howManyUsers, User, Following, sequelize){
    // await sequelize.sync({ force: true });
    let arrOfUsers = []
    const RandNames = [
      "Wade",
      "Dave",
      "Seth",
      "Ivan",
      "Riley",
      "Gilbert",
      "Jorge",
      "Dan",
      "Brian",
      "Roberto",
      "Ramon",
    ];
    for (let user_id = 0; user_id < howManyUsers; user_id++) {
      console.log('getRandomInt(RandNames.length)',getRandomInt(RandNames.length), User)
      arrOfUsers[user_id] = (await User.create({
        first_name: `${RandNames[getRandomInt(RandNames.length)]}_${RandNames[getRandomInt(RandNames.length)]}`,
      }))
      
    }
    
    arrOfUsers.forEach(async (user, user_id, array)=>{
    //const maxCountOfFollowers = 151 // Will be an error, just check
      const maxCountOfFollowers = 150
      const countOfFollowings = getRandomInt(array.length < 150 ? maxCountOfFollowers : 150 ); user_id++
      for (let user_id_followee = 1;user_id_followee < countOfFollowings;user_id_followee++) {
        const markerIsDuplicated = !(await Following.count({
          where: { user_id, user_id_followee },
        }));
    
        if (markerIsDuplicated) {
          await Following.create({
            user_id,
            user_id_followee,
          });
        }
      }
    })
  
    function getRandomInt(max, min = 0) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  }
