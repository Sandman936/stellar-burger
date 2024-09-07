# Проектная работа "Stellar Burgers"

[Макет](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

[Чеклист](https://www.notion.so/praktikum/0527c10b723d4873aa75686bad54b32e?pvs=4)

## Этапы работы:

1. Все компоненты проекта лежат в папке `src/components`

2. Настроен роутинг.

3. Создан функционал запросов данных с сервера, с использованием `Redux` и глобального `store`. Все способы взаимодействия с сервером описаны в `utils/burger-api.ts`

4. Настроена авторизация и созданы защищённые роуты.

## Важно:

Для корректной работы запросов к серверу необходимо добавить переменную BURGER_API_URL в окружение. Сама ссылка находится в файле `.env.example`.
