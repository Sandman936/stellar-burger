# Проектная работа "Stellar Burgers"

[Макет](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

## Этапы работы:

1. Все компоненты проекта лежат в папке `src/components`

2. Настроен роутинг.

3. Создан функционал запросов данных с сервера, с использованием `Redux` и глобального `store`. Все способы взаимодействия с сервером описаны в `utils/burger-api.ts`

4. Настроена авторизация и созданы защищённые роуты.

## Функционал: 
1. Регистрация/вход/аутентификация пользователей
2. Возможность собрать из ингредиентов бургер и оформить заказ
3. Просмотр ленты всех заказов и своих заказов в профиле

Страница конструктора бургера покрыта тестами e2e (cypress) и тестами компонентов (jest)

## Стек используемых технологий: 
React, библиотеки Redux и React-Router, Storybook, TypeScript, jest, cypress, REST API, ESLint, Prettier

## Важно:

Для корректной работы запросов к серверу необходимо добавить переменную BURGER_API_URL в окружение. Сама ссылка находится в файле `.env.example`.
