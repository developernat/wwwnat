
const formatDate = (dateString) => {
    const dateParts = dateString.split(/[-T:.Z]/);

    const day = dateParts[2].toString().padStart(2, '0');
    const month = dateParts[1].toString().padStart(2, '0');
    const year = dateParts[0].toString();
    const hours = dateParts[3].toString().padStart(2, '0');
    const minutes = dateParts[4].toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

const formatDateNotHours = (dateString) => {

    const dateParts = dateString.split(/[-T:.Z]/);
    return dateParts[2]+"/"+dateParts[1]+"/"+dateParts[0];

}


function formatDateNotHoursForm(dateStrings) {

    const dateParts = dateStrings.split(/[-T:.Z]/);
    return dateParts[0]+"-"+dateParts[1]+"-"+dateParts[2];
  }

function FirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function translateGender(word) {

    const translations = {
        'male': 'masculino',
        'female': 'femenino'

    };
    return FirstLetter(translations[word] || word);
}




export { formatDate, formatDateNotHours, FirstLetter, translateGender, formatDateNotHoursForm };