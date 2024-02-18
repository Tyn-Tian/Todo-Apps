export default function isStorageAvailable() {
    if (typeof Storage === undefined) {
        alert("Browsur kamu tidak mendukung local storage");
        return false;
    }
    return true;
}
