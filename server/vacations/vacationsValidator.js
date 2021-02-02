const validator = newData => {
    let errors = [];
    const {destination, description, price, FromDate, ToDate, image} = newData;
    if (!destination) {
        errors.push('Destination is missing');
    }
    if (!description) {
        errors.push('Description is missing');
    }
    if (!price) {
        errors.push('Price is missing');
    }
    if (!FromDate || !ToDate) {
        errors.push('Date is missing');
    }

    if (!image) {
        errors.push('Image is missing');
    }

    if (errors.length === 0) {
        errors = null;
    }

    return { description, destination, price, FromDate, ToDate, image, errors };
}

module.exports = {validator};