

import {ActionType, calculator, sum} from "./Reducer";


//принимает 2 параметра - первый название - второй колбэк

test ("sum", ()=> {

    //1. Тестовые данные
    const num1 = 10
    const num2 = 12

    //2. Выполнение тестируемого кода
    const result = sum(num1, num2)

    //3. Сравнение с ожидаемым результатом
    expect(result).toBe(22)
})


 test ("sum  of calculator", ()=> {

    //1. Тестовые данные

    //2. Выполнение тестируемого кода
     const action: ActionType = {type:"SUM", number: 12}
    const result = calculator(10, action)

    //3. Сравнение с ожидаемым результатом
    expect(result).toBe(22)
})

test ("MULT  of calculator", ()=> {

    //1. Тестовые данные

    //2. Выполнение тестируемого кода
     const action: ActionType = {type:"MULT", number: 12}
    const result = calculator(10, action)

    //3. Сравнение с ожидаемым результатом
    expect(result).toBe(120)
})

test ("sub  of calculator", ()=> {

    //1. Тестовые данные

    //2. Выполнение тестируемого кода
     const action: ActionType = {type:"SUB", number: 12}
    const result = calculator(10, action)

    //3. Сравнение с ожидаемым результатом
    expect(result).toBe(-2)
})
test ("DIV  of calculator", ()=> {

    //1. Тестовые данные

    //2. Выполнение тестируемого кода
     const action: ActionType = {type:"DIV", number: 12}
    const result = calculator(10, action)

    //3. Сравнение с ожидаемым результатом
    expect(result).toBe(0.8333333333333334)
})

