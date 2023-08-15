document.addEventListener('DOMContentLoaded', function () {
    const searchContainer = document.querySelector('.search-box');

    if (!searchContainer) return;

    const searchForm = searchContainer.querySelector('.search-box__form');
    const searchInput = searchContainer.querySelector('[name="search"]');
    const keywordsInput = searchContainer.querySelector('[name="keywords"]');

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const searchValue = searchInput.value;
        const keywordsValue = keywordsInput.value;

        if (searchValue.trim() === '') {
            showAlert('Search field is empty');
            return;
        }
        if (keywordsValue.trim() === '') {
            showAlert('Keywords field is empty');
            return;
        }

        const keywords = getCorrectKeywords(keywordsValue);

        const results = checkSearchValue(searchValue, keywords);

        if (Object.keys(results).length === 0) {
            showAlert('No results found');
            return;
        }

        insertResults(results);
    } );

});

function getCorrectKeywords(keywordsValue) {
    const keywordsArray = keywordsValue.split(/[, ]+/);

    return keywordsArray.filter(function (keyword) {
        return keyword.trim() !== '' && keyword.trim().startsWith('mod_');
    } );

}
function checkSearchValue(searchText, keywords) {
    const searchArray = searchText.split(' ');
    const resultsObject = { };

    keywords.filter(function (keyword) {
        if (searchArray.includes(keyword)) {
            return resultsObject[keyword] = 'Found';
        } else {
            return resultsObject[keyword] = 'Not Found';
        }
    } );

    return resultsObject;
}

function insertResults(results) {
    const resultsContainer = document.querySelector('.search-box__results');
    const resultsList = resultsContainer.querySelector('.search-box__list');

    resultsList.innerHTML = '';

    Object.keys(results).forEach(function (keyword) {
        const resultItem = document.createElement('li');
        resultItem.textContent = `${keyword}: ${results[keyword]}`;

        resultsList.appendChild(resultItem);
    } );

    resultsContainer.classList.remove('search-box__results--hidden');
    showAlert('Results are ready', true);
}

function showAlert(message, success = false) {
    const alertContainer = document.querySelector('.search-box__alert');
    const alertText = alertContainer.querySelector('.search-box__alert-text');

    alertText.textContent = message;

    alertContainer.classList.remove('--hidden')

    if (success) {
        alertText.classList.add('--success');
    } else {
        alertText.classList.remove('--success');
    }
}
