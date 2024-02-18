export function isStorageAvailable() {
    if (typeof Storage === undefined) {
        alert("Browser Anda tidak mendukung local storage");
        return false;
    }
    return true;
}
