export const errors: { [key: string]: string } = {
  "auth/invalid-email": "Вы ввели некоректную почту",
  "auth/user-not-found": "Пользователь с такой почтой не найден",
  "auth/wrong-password": "Вы ввели неверный пароль",
  "auth/weak-password": "Пароль должен быть длинее 6ти символов",
  "auth/account-exists-with-different-credential":
    "Аккаунт с такой почтой уже используется в другом типе авторизации"
};
