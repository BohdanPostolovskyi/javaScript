function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

function triangle(value1, type1, value2, type2) {
    const radToDeg = (radians) => radians * (180 / Math.PI);
    const getKey = (type1, type2) => `${type1}_${type2}`;

    let hypotenuse, leg1, leg2, angle1, angle2;

    if (value1 <= 0 || value2 <= 0) {
        console.log("Дані не можуть бути нижчі за 0 чи дорівнювати йому. ПЕРЕЧИТАЙ ІНСТРУКЦІЮ!");
        return "failed";
    }

    if (leg1 <= 0 || leg2 <= 0 || hypotenuse <= 0 || leg1 >= hypotenuse || leg2 >= hypotenuse || angle1 <= 0 || angle2 <= 0 || angle1 >= Math.PI / 2 || angle2 >= Math.PI / 2) {
        console.log("Некоректні дані, такі параметри неможливі в прямокутному трикутнику. Сам знаєш що робити???");
        return "failed";
    }

    switch (getKey(type1, type2)) {
        case "leg_leg":
            leg1 = Math.min(value1, value2);
            leg2 = Math.max(value1, value2);
            hypotenuse = Math.sqrt(leg1 * leg1 + leg2 * leg2);
            angle1 = Math.atan(leg1 / leg2);
            angle2 = Math.PI / 2 - angle1;
            break;
        case "leg_hypotenuse":
            case "hypotenuse_leg":
                leg1 = (type1 === "leg") ? value1 : value2;
                hypotenuse = (type1 === "hypotenuse") ? value1 : value2;
                if (hypotenuse < leg1) {
                    console.log("Катет не може бути більшим за гіпотенузу. ПЕРЕЧИТАЙ ІНСТРУКЦІЮ та вікіпедію!");
                    return "failed";
                } else {
                    leg2 = Math.sqrt(hypotenuse * hypotenuse - leg1 * leg1);
                    angle2 = Math.asin(leg1 / hypotenuse);
                    angle1 = Math.PI / 2 - angle2;
                }
                break;
        case "leg_opposite angle":
            case "opposite angle_leg":
                leg1 = (type1 === "leg") ? value1 : value2;
                angle2 = (type1 === "opposite angle") ? degToRad(value1) : degToRad(value2);
                hypotenuse = leg1 / Math.sin(angle2);
                leg2 = leg1 / Math.tan(angle2);
                angle1 = Math.PI / 2 - angle2;
                break;
        case "leg_adjacent angle":
            case "adjacent angle_leg":
                leg1 = (type1 === "leg") ? value1 : value2;
                angle1 = (type1 === "adjacent angle") ? degToRad(value1) : degToRad(value2);
                hypotenuse = leg1 / Math.cos(angle1);
                leg2 = leg1 * Math.tan(angle1);
                angle2 = Math.PI / 2 - angle1;
                break;
        case "hypotenuse_angle":
            case "angle_hypotenuse":
                hypotenuse = (type1 === "hypotenuse") ? value1 : value2;
                angle1 = (type1 === "angle") ? degToRad(value1) : degToRad(value2);
                leg1 = hypotenuse * Math.cos(angle1);
                leg2 = hypotenuse * Math.sin(angle1);
                angle2 = Math.PI / 2 - angle1;
                break;
        default:
            console.log("Ти ввів несумісну пару параметрів трикутника, або ж вони взагалі відсутні, або ти ввів що небудь з клавіатури що тобі хотілося, Я ДЛЯ КОГО ПИСАВ ІНСТРУКЦІЮ?. ПЕРЕЧИТАЙ ІНСТРУКЦІЮ та вікіпедію!");
            return "failed";
    }

    let alpha = radToDeg(angle1);
    let beta = radToDeg(angle2);

    if (alpha >= 90 || beta >= 90) {
        console.log("Кут не може бути більший за 90 чи дорівнювати йому. ПЕРЕЧИТАЙ ІНСТРУКЦІЮ!");
        return "failed";
    }

    console.log(`a = ${leg1.toFixed(3)}`);
    console.log(`b = ${leg2.toFixed(3)}`);
    console.log(`c = ${hypotenuse.toFixed(3)}`);
    console.log(`alpha = ${alpha.toFixed(3)}°`);
    console.log(`beta = ${beta.toFixed(3)}°`);
    return "success";
}

console.log("\t\t\tІНСТРУКЦІЯ");
console.log("Дана консольна програма дозволяє обчислити прямокутний трикутник за заданими параметрами");
console.log("Визначення типів та значень елементів:");
console.log("\tleg: Довжина катета.");
console.log("\thypotenuse: Довжина гіпотенузи.");
console.log("\topposite angle: Величина протилежного кута до катета.");
console.log("\tadjacent angle: Величина прилеглого кута до катета.");
console.log("\tangle: Величина одного з гострих кутів.");
console.log('Коректний виклик функції:\n\tВикористовуйте функцію triangle() з чотирма аргументами: value1, type1, value2, type2.\n\tНаприклад: triangle(7, "leg", 18, "hypotenuse").');
console.log('Можливі комбінації типів елементів:\n\t"leg" "leg": Два катети.\n\t"leg" "hypotenuse": Катет і гіпотенуза.\n\t"leg" "opposite angle": Катет і протилежний кут.\n\t"leg" "adjacent angle": Катет і прилеглий кут.\n\t"hypotenuse" "angle": Гіпотенуза і гострий кут.');
console.log("Діапазони значень:\n\tЗначення катетів та гіпотенузи повинні бути додатніми числами.\n\tВеличина кутів повинна бути в межах від 0 до 90 градусів.\n\tКатет не може бути більшим за гіпотенузу.");
console.log("Вивід результатів:\n\ta, b, c: Довжина катета, другого катета та гіпотенузи, відповідно.\n\talpha, beta: Величина гострого кута, що лежить навпроти катета a та b відповідно.");
console.log('У разі успішного виконання програми ви отримаєте рядок "success".\n\tУ випадку некоректних даних ви отримаєте"failed".\n\tПісля чого вам буде запропоновано перечитати інструкції.');