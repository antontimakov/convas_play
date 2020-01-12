<?php
function getFish(){
    // Выбираем по 1 случайному предмету из каждой группы
    $query = "
         SELECT DISTINCT ON (it.prior)
            i.id,
            it.probability,
            it.prior
        FROM public.titem AS i
        INNER JOIN public.titem_type AS it ON (i.item_type_id = it.id)
        ORDER BY
            it.prior,
            RANDOM()
    ";
    $laRes = DbProxy::requestByQuery($query);
    $item = idByRand($laRes);
    Achievements::setCountItems();
    // Вставляем запись в рюкзак, если там нет такого предмета
    $query = "
        INSERT INTO public.tbag (
            user_id,
            item_id
        ) SELECT 
            1,
            {$item}
        WHERE NOT EXISTS (
            SELECT 1
            FROM public.tbag
            WHERE
                user_id = 1 AND
                item_id = {$item}
        )
    ;";
    DbProxy::requestByQuery($query);
    // Добавляем предмет в рюкзак (увеличиваем кол-во)
    $query = "
        UPDATE public.tbag
        SET bcount = bcount + 1
        WHERE 
            user_id = 1 AND
            item_id = {$item}
    ;";
    DbProxy::requestByQuery($query);
    Achievements::countItems();
    // Добавляем опыт пользователю
    $query = "
        UPDATE public.tuser AS u
        SET experience = u.experience + i.experience
        FROM public.titem AS i
        WHERE i.id = {$item}
    ;";
    DbProxy::requestByQuery($query);
    // Выбираем результат улова для отправки на клиент
    $query = "
        SELECT
            id,
            name,
            src_full
        FROM public.titem
        WHERE id = {$item}
    ;";
    return DbProxy::requestByQuery($query);
}
// Выбирает категорию в соответстви с распределением вероятностей
function idByRand($paRes){
    $lnRand = rand (0,99);
    $lnSumProb = 0; // сумма вероятностей
    foreach ($paRes as $paRe) {
        $lnSumProb += $paRe['probability'];
        if ($lnSumProb > $lnRand){
            return $paRe['id'];
        }
    }
    return false;
}