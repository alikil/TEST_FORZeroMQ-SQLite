# TEST FOR VACANCY TS-ZeroMQ-SQLite3
 Client/Server api for reseve login/pass from user promt => Check in DB => if Pass true return status ok/err

# Тестовое задание #

Написать две программы на Node.js; первая будет выступать в роли сервера, вторая - клиента. Взаимодействовать
они будут по [ZeroMQ](http://zeromq.org/). "Клиент" будет отправлять запросы на логин, а "сервер" - в зависимости
от данных в БД отвечать на эти запросы.

# Запуск Сервера/Клиента #

npm run server
npm run client

Также есть возможность получать значение порта process.env.sub / process.env.pub

## Параметры для теста ##
email = xxx@mail.com
password = yyy

## Требования ##
"Сервер" должен:

1. принять следующие аргументы командной строки: `pub`, `sub`
1. подключиться ZeroMQ pub-сокетом по TCP к хосту `127.0.0.1` на порт `pub` (socket.bindSync)
1. подключиться ZeroMQ sub-сокетом по TCP к хосту `127.0.0.1` на порт `sub` (socket.bindSync)
1. подключиться к БД (SQLite)
1. подписаться sub-сокетом на сообщения с первым фреймом `api_in`
1. при получении сообщения по sub-сокету
   1. распарсить джсон, переданный во втором фрейме сообщения
   1. если в джсоне поле `type` равно строке `"login"` 
      1. проверить пароль пользователя, основываясь на данных таблицы `user` (ее формат ниже)
      1. в зависимости от результата проверки отправить сообщение по pub-сокету (его формат ниже)

"Клиент" должен:

1. принять следующие аргументы командной строки: `pub`, `sub`
1. подключиться ZeroMQ pub-сокетом по TCP к хосту `127.0.0.1` на порт `sub` (socket.connect)
1. подключиться ZeroMQ sub-сокетом по TCP к хосту `127.0.0.1` на порт `pub` (socket.connect)
1. подписать sub-сокет на сообщения с первым фреймом `api_out`
1. при получении сообщения по sub-сокету
   1. распарсить джсон, переданный во втором фрейме сообщения
   1. если в джсоне поле `status` равно строке `"ok"` - вывести в консоль `"ok"`
   1. если в джсоне поле `status` равно строке `"error"` - вывести в консоль значение поля `error`
1. запросить у пользователя логин  (через командную строку)
1. запросить у пользователя пароль (через командную строку)
1. отправить через pub-сокет сообщение, у которого первый фрейм `api_in`, второй - json-строка 
   с полями type: 'login', email и pwd - данные от пользователя, `msg_id` - случайно сгенерированная строка

Поле error может принимать одно из след. значений:
`WRONG_PWD` - неправильный логин или пароль;
`WRONG_FORMAT` - Пользователя нет в БД.


