export const reducer = (state, action) => {
    switch (action.type) {
      case 'success':
        console.log('success case in reducer')
        return {
          message_res_id: 1,
          message: 'Мы успешно забронировали за вами столик!\nСкоро наш менеджер свяжется с вами для уточнения деталей.',
        };
      case 'unsuccess':
        console.log('unsuccess case in reducer')
        return {
          message_res_id: 0,
          message: 'Что-то пошло не так! Обращаем внимание, что если вы находитесь в режиме инкогнито, заброировать место не получится. Попытайтесь позже или позвоните нам по телефону',
        };
      case 'open':
        console.log('open case in reducer')
        return {
            isShown: true
        }
        case 'close':
            console.log('close case in reducer')
            return {
                isShown: false
            }
      default:
        return state;
    }
  };