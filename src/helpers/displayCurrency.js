
const displayARSCurrency = (num) => {
    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    })

    return formatter.format(num);
};

export default displayARSCurrency;