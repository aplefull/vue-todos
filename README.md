# Vue Todo App

Проект развернут на [https://storied-scone-b22820.netlify.app/](https://storied-scone-b22820.netlify.app/)

## Что сделано

- Добавление, удаление, редактирование и отметка выполнения задач
- Перетаскивание и сортировка
- Фильтрация задач (Все/Активные/Выполненные)
- Групповые действия (Отметить все, Очистить выполненные)
- Сохранение задач через API
- Тёмная тема и адаптив

## Что можно улучшить

### API интеграция
Текущий Pantry API имеет строгие ограничения на количество запросов, поэтому часто возвращает 429 (Too Many Requests).   
Было бы правильнее использовать другой API сервис.

### Состояния загрузки   
Нет индикации загрузки для отдельных действий - стейт меняется сразу же.   
Нужно добавить состояние загрузки на случай ошибок.

## Затраченное время
5.5 часов
