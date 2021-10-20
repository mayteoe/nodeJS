module.exports.getSaludo = (date) => {
    if (date === undefined || _parameterValid(date) === false) {
        return 'Hola!';
    }

    const hour = date.getHours();

    if (hour >= 7 && hour < 10) {
        return 'Buenos días';
    }
    if (hour >= 10 && hour < 13) {
        return 'Hola, ¿cómo va la mañana?';
    }
    if (hour >= 13 && hour < 15) {
        return 'Hola, ¿vamos a comer?';
    }
    if (hour >= 15 && hour < 16) {
        return 'Buenas tardes, ¿tomamos un café?';
    }
    if (hour >= 16 && hour < 20) {
        return 'Buenas tardes'
    }
    if (hour >= 20) {
        return 'Buenas noches';
    }
}

function _parameterValid(date) {
    return date instanceof Date;
}